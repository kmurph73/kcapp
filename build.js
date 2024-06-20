import fs from 'node:fs/promises';

try {
	await fs.rm('dist', {recursive: true, force: true});
} catch {
}

await fs.mkdir("dist");

let html = await fs.readFile('app/index.html', 'utf8');

html = html.replace("/index.js", "/kcapp/index.js");

await fs.writeFile('dist/index.html', html);