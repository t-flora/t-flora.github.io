import type { APIContext } from "astro";

import { PAGES, type PageKey } from "@/data/pages";
import { renderOgImage } from "@/utils/og";

export function getStaticPaths() {
	return Object.keys(PAGES).map((page) => ({ params: { page } }));
}

export async function GET({ params }: APIContext) {
	const { description, title } = PAGES[params.page as PageKey];
	return renderOgImage({ subtitle: description, title });
}
