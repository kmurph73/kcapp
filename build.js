import fs from 'node:fs/promises';

try {
	await fs.rm('docs', {recursive: true, force: true});
} catch {
}

await fs.mkdir("docs");

let html = await fs.readFile('app/index.html', 'utf8');

html = html.replace("/index.js", "/kcapp/index.js");

await fs.writeFile('docs/index.html', html);