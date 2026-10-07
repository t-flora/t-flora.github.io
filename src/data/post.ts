import { AGING_THRESHOLD_MS } from "@/utils/aging";
import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllPosts() {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** sort posts by publish date, newest first */
export function sortMDByDate(posts: CollectionEntry<"post">[]) {
	return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/** groups posts by publish year, using the year as the key */
export function groupPostsByYear(posts: CollectionEntry<"post">[]) {
	return posts.reduce<Record<string, CollectionEntry<"post">[]>>((acc, post) => {
		const year = post.data.publishDate.getFullYear();
		(acc[year] ??= []).push(post);
		return acc;
	}, {});
}

/** the date the post was last stood behind: last reviewed if set, otherwise published */
export function getReviewBaseline(post: CollectionEntry<"post">) {
	return post.data.lastReviewed ?? post.data.publishDate;
}

/** whether the post is old enough to show the aging note, as of `now` */
export function isAging(post: CollectionEntry<"post">, now = new Date()) {
	return now.valueOf() - getReviewBaseline(post).valueOf() > AGING_THRESHOLD_MS;
}

/** the currently pinned post, if any; fails the build if more than one is pinned */
export function getPinnedPost(posts: CollectionEntry<"post">[]) {
	const pinned = posts.filter((p) => p.data.pinned);
	if (pinned.length > 1) {
		throw new Error(`Only one post can be pinned; found: ${pinned.map((p) => p.id).join(", ")}`);
	}
	return pinned[0];
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"post">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"post">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
