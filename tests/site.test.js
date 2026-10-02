const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const runBuild = () => spawnSync(process.execPath, ['scripts/build-site.js'], { cwd: root, encoding: 'utf8' });
test('Publicação contém somente os arquivos do aplicativo com caminhos relativos', () => {
  const result = runBuild();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(fs.readdirSync(output).sort(), ['.nojekyll', 'app.js', 'domain.js', 'favicon.png', 'index.html', 'styles.css']);
  for (const name of ['index.html', 'styles.css', 'app.js', 'domain.js', 'favicon.png']) {
    assert.deepEqual(fs.readFileSync(path.join(output, name)), fs.readFileSync(path.join(root, name)));
  }
  const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    assert.ok(!match[1].startsWith('/'), 'Caminho deve funcionar sob /nome-do-repositorio/');
    assert.ok(fs.existsSync(path.join(output, match[1])), 'Referência ausente: ' + match[1]);
  }
  const unexpected = path.join(output, 'documento-nao-publicar.txt');
  fs.writeFileSync(unexpected, 'Este arquivo deve impedir a publicação.');
  try {
    const blocked = runBuild();
    assert.notEqual(blocked.status, 0);
    assert.match(blocked.stderr, /Arquivos inesperados/);
  } finally { fs.unlinkSync(unexpected); }
});
