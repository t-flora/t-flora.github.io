import { type CollectionEntry, getCollection } from "astro:content";

/** Posts, Projects and Timeline entries with this tag appear on the AI Hub. */
export const AI_TAG = "ai";

export function hasTag(entry: { data: { tags: string[] } }, tag: string) {
	return entry.data.tags.includes(tag);
}

/** Projects in display order. */
export async function getProjects() {
	const projects = await getCollection("project");
	return projects.sort(
		(a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
	);
}

type TimelineEntry = CollectionEntry<"timeline">;

function sortKey({ data }: TimelineEntry) {
	const end = data.end === "present" ? "9999-99" : (data.end ?? data.start ?? "");
	return `${end}|${data.start ?? ""}`;
}

/** Timeline entries, most recent (or ongoing) first. */
export async function getTimeline() {
	const entries = await getCollection("timeline");
	return entries.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}

const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function parts(yearMonth: string) {
	const [year, month] = yearMonth.split("-");
	return { month: monthFormat.format(new Date(Date.UTC(+year!, +month! - 1, 1))), year: year! };
}

/** "Jun–Aug 2026", "Jun 2022 – May 2025", "Sep 2026 – present", "until Dec 2026". */
export function formatSpan({ data: { end, start } }: TimelineEntry) {
	if (!start && !end) return "";
	if (!start) return end === "present" ? "ongoing" : `until ${fmt(end!)}`;
	if (!end) return fmt(start);
	if (end === "present") return `${fmt(start)} – present`;
	const s = parts(start);
	const e = parts(end);
	if (s.year === e.year) return s.month === e.month ? fmt(start) : `${s.month}–${e.month} ${e.year}`;
	return `${fmt(start)} – ${fmt(end)}`;

	function fmt(ym: string) {
		const p = parts(ym);
		return `${p.month} ${p.year}`;
	}
}
