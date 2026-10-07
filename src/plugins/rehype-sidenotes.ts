/**
 * Turns Markdown footnotes into Gwern/Tufte-style sidenotes.
 *
 * For each footnote reference, the footnote's content is copied into an inline
 * `<span class="sidenote" aria-hidden="true">` right after the reference. CSS shows
 * these in the right margin on wide screens and hides the regular footnote list
 * visually (it stays available to screen readers). On narrow screens the sidenotes
 * are hidden and the footnote list at the end is shown instead.
 *
 * Sidenotes live inside paragraphs, so footnote paragraphs become block-styled spans.
 * Keep footnotes to inline content (text, links, emphasis, code, math); lists or code
 * blocks inside a footnote only render correctly in the end-of-post list.
 */

interface Node {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	children?: Node[];
	value?: string;
}

function walk(node: Node, visit: (node: Node, parent: Node | undefined) => void, parent?: Node) {
	visit(node, parent);
	for (const child of node.children ?? []) walk(child, visit, node);
}

function isElement(node: Node, tagName?: string): boolean {
	return node.type === "element" && (tagName === undefined || node.tagName === tagName);
}

/** Deep-copies footnote content, dropping back-reference links and turning <p> into spans. */
function toSidenoteContent(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		if (isElement(node, "a") && node.properties?.dataFootnoteBackref !== undefined) continue;
		const copy: Node = { ...node, properties: { ...node.properties } };
		if (node.children) copy.children = toSidenoteContent(node.children);
		if (isElement(node, "p")) {
			copy.tagName = "span";
			copy.properties = { className: ["sidenote-para"] };
		}
		if (copy.properties?.id) delete copy.properties.id;
		out.push(copy);
	}
	// Footnote text usually ends with whitespace before the removed back-reference.
	const last = out.at(-1);
	if (last?.type === "text" && last.value) last.value = last.value.trimEnd();
	return out;
}

export function rehypeSidenotes() {
	return (tree: Node) => {
		const footnotes = new Map<string, Node[]>();

		walk(tree, (node) => {
			if (!isElement(node, "li")) return;
			const id = node.properties?.id;
			if (typeof id === "string" && id.startsWith("user-content-fn-")) {
				footnotes.set(id, node.children ?? []);
			}
		});
		if (footnotes.size === 0) return;

		walk(tree, (node) => {
			const children = node.children;
			if (!children) return;
			for (let i = 0; i < children.length; i++) {
				const sup = children[i]!;
				if (!isElement(sup, "sup")) continue;
				const ref = sup.children?.find(
					(c) => isElement(c, "a") && c.properties?.dataFootnoteRef !== undefined,
				);
				const href = ref?.properties?.href;
				if (typeof href !== "string") continue;
				const content = footnotes.get(href.replace(/^#/, ""));
				if (!content) continue;

				const label = ref?.children?.find((c) => c.type === "text")?.value ?? "";
				const sidenote: Node = {
					type: "element",
					tagName: "span",
					properties: { ariaHidden: "true", className: ["sidenote"] },
					children: [
						{
							type: "element",
							tagName: "span",
							properties: { className: ["sidenote-number"] },
							children: [{ type: "text", value: label }],
						},
						...toSidenoteContent(content),
					],
				};
				children.splice(i + 1, 0, sidenote);
				i++;
			}
		});
	};
}
