import type { APIContext, InferGetStaticPropsType } from "astro";

import { getAllPosts } from "@/data/post";
import { getFormattedDate } from "@/utils";
import { renderOgImage } from "@/utils/og";

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;
	return renderOgImage({ footer: getFormattedDate(pubDate, { month: "long" }), title });
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: post.id },
			props: {
				pubDate: post.data.publishDate,
				title: post.data.title,
			},
		}));
}
