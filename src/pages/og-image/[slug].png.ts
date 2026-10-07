import type { APIContext, InferGetStaticPropsType } from "astro";

import SourceSerif from "@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff";
import SourceSerifSemibold from "@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	fonts: [
		{
			data: Buffer.from(SourceSerif),
			name: "Source Serif 4",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(SourceSerifSemibold),
			name: "Source Serif 4",
			style: "normal",
			weight: 600,
		},
	],
	height: 630,
	width: 1200,
};

// Mirrors the site's light theme: warm paper background, near-black text, rust accent.
const markup = (title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-[#faf7f2] text-[#2a2520] px-20 py-16" style="font-family: 'Source Serif 4'">
		<div tw="flex text-3xl font-semibold">${siteConfig.title}</div>
		<div tw="flex flex-col flex-1 justify-center">
			<h1 tw="text-7xl font-semibold leading-tight m-0" style="letter-spacing: -0.01em">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full pt-8 border-t-2 border-[#9a4a27] text-3xl text-[#6e655b]">
			<p tw="m-0">${siteConfig.author}</p>
			<p tw="m-0">${pubDate}</p>
		</div>
	</div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;

	const postDate = getFormattedDate(pubDate, { month: "long" });
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
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
