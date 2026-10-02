'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const files = ['index.html', 'styles.css', 'app.js', 'domain.js', 'favicon.png'];
const allowed = new Set([...files, '.nojekyll']);
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw Error('Destino de build inválido.');
if (fs.existsSync(output)) {
  if (fs.lstatSync(output).isSymbolicLink() || !fs.lstatSync(output).isDirectory()) throw Error('dist deve ser uma pasta local do projeto.');
  const unexpected = fs.readdirSync(output).filter(name => !allowed.has(name));
  if (unexpected.length) throw Error('Arquivos inesperados em dist: ' + unexpected.join(', ') + '. Remova-os antes de publicar.');
}
for (const name of files) {
  const source = path.join(root, name);
  if (!fs.lstatSync(source).isFile() || fs.lstatSync(source).isSymbolicLink()) throw Error('Arquivo de publicação inválido: ' + name);
  const destination = path.join(output, name);
  if (fs.existsSync(destination) && (!fs.lstatSync(destination).isFile() || fs.lstatSync(destination).isSymbolicLink())) throw Error('Destino de publicação inválido: ' + name);
}
fs.mkdirSync(output, { recursive: true });
for (const name of files) fs.copyFileSync(path.join(root, name), path.join(output, name));
const marker = path.join(output, '.nojekyll');
if (fs.existsSync(marker) && (!fs.lstatSync(marker).isFile() || fs.lstatSync(marker).isSymbolicLink())) throw Error('Marcador de publicação inválido.');
fs.writeFileSync(marker, '');
console.log('GitHub Pages: dist/ contém apenas os cinco arquivos do protótipo e .nojekyll.');
