import {
	readFile,
	writeFile,
	readdir,
	mkdir,
	cp,
	copyFile,
	rm,
} from "fs/promises";

const manifest = [];

await rm("./dist", { recursive: true, force: true });

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

		await mkdir(`./dist/${font}/previews`, { recursive: true });
		await cp(`${font}/`, `./dist/${font}`, { recursive: true });
	} catch (e) {}
}

await copyFile("index.html", "dist/index.html");
await writeFile("dist/manifest.json", JSON.stringify(manifest));
