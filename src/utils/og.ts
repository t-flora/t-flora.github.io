// Social preview images (1200x630), rendered at build time with Satori.
// Mirrors the site's light theme: warm paper background, near-black text, rust accent.
import SourceSerif from "@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff";
import SourceSerifSemibold from "@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff";
import { siteConfig } from "@/site-config";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	fonts: [
		{ data: Buffer.from(SourceSerif), name: "Source Serif 4", style: "normal", weight: 400 },
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

interface Card {
	/** Bottom-right text, e.g. a publish date. Defaults to the site's host. */
	footer?: string;
	/** Smaller line under the title. */
	subtitle?: string;
	title: string;
}

// satori-html can't nest templates, so the subtitle is a separate variant.
const markup = ({ footer = "t-flora.github.io", subtitle, title }: Card) =>
	subtitle
		? html`<div
				tw="flex flex-col w-full h-full bg-[#faf7f2] text-[#2a2520] px-20 py-16"
				style="font-family: 'Source Serif 4'"
			>
				<div tw="flex text-3xl font-semibold">${siteConfig.title}</div>
				<div tw="flex flex-col flex-1 justify-center">
					<h1 tw="text-7xl font-semibold leading-tight m-0" style="letter-spacing: -0.01em">
						${title}
					</h1>
					<p tw="text-4xl text-[#6e655b] mt-6 mb-0 leading-snug">${subtitle}</p>
				</div>
				<div
					tw="flex items-center justify-between w-full pt-8 border-t-2 border-[#9a4a27] text-3xl text-[#6e655b]"
				>
					<p tw="m-0">${siteConfig.author}</p>
					<p tw="m-0">${footer}</p>
				</div>
			</div>`
		: html`<div
				tw="flex flex-col w-full h-full bg-[#faf7f2] text-[#2a2520] px-20 py-16"
				style="font-family: 'Source Serif 4'"
			>
				<div tw="flex text-3xl font-semibold">${siteConfig.title}</div>
				<div tw="flex flex-col flex-1 justify-center">
					<h1 tw="text-7xl font-semibold leading-tight m-0" style="letter-spacing: -0.01em">
						${title}
					</h1>
				</div>
				<div
					tw="flex items-center justify-between w-full pt-8 border-t-2 border-[#9a4a27] text-3xl text-[#6e655b]"
				>
					<p tw="m-0">${siteConfig.author}</p>
					<p tw="m-0">${footer}</p>
				</div>
			</div>`;

export async function renderOgImage(card: Card) {
	const svg = await satori(markup(card), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}
