import { readFile, writeFile, readdir } from "fs/promises";

const manifest = [];

for (let font of await readdir("./")) {
	if (font.startsWith(".") || font == "assets") continue;
	try {
		const fontManifest = JSON.parse(
			await readFile(`./${font}/${font}-font-snippet.json`),
		);
		const previews = [];
		try {
			for (let file of await readdir(`./${font}/previews`)) {
				previews.push(`${font}/previews/${file}`);
			}
		} catch (e) {}
		manifest.push({
			name: fontManifest["name"],
			manifest: `${font}/${font}-font-snippet.json`,
			previews: previews,
		});
	} catch (e) {}
}

await writeFile("manifest.json", JSON.stringify(manifest));
