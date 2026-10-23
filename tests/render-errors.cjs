// Executes the shipped renderer with a minimal DOM harness, without network access.
// Catches lost source recovery and console-only failures; not browser/CSP proof.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('skills/markmap/assets/template.html', 'utf8');
const script = [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(code => code.includes('DOMContentLoaded'));

function render(payload, markmap) {
  let ready;
  // Derive available elements and initial visibility from the shipped markup,
  // so removing the recovery section cannot be masked by the harness.
  const nodes = Object.fromEntries([...source.matchAll(/<[\w-]+\b([^>]*\bid="([^"]+)"[^>]*)>/g)]
    .map(match => [match[2], {hidden: /\bhidden\b/.test(match[1]), textContent: '', value: ''}]));
  nodes['markdown-source'].textContent = payload;
  vm.runInNewContext(script, {
    window: {markmap, addEventListener: (event, fn) => { ready = fn; }},
    document: {getElementById: id => nodes[id]},
    console: {error: () => {}},
  });
  ready();
  return nodes;
}

// Network unavailable or blocked: preserve decoded Markdown, including markup,
// as textarea data rather than executing/interpolating it into HTML.
const markdown = '# Source\n- <img src=x onerror=alert(1)>\n- Tiếng Việt';
const failed = render(JSON.stringify(markdown));
assert.equal(failed['render-error'].hidden, false, 'CDN failure needs visible recovery');
assert.equal(failed['source-recovery'].value, markdown, 'Recover the original Markdown');

const malformed = render('{broken');
assert.equal(malformed['render-error'].hidden, false, 'Invalid JSON needs visible recovery');
assert.equal(malformed['source-recovery'].value, '{broken', 'Keep malformed source available');

const invalidType = render('null');
assert.equal(invalidType['render-error'].hidden, false, 'Non-string payload needs visible recovery');
assert.equal(invalidType['source-recovery'].value, 'null');

// Empty valid Markdown is still recoverable without substituting its JSON encoding.
assert.equal(render('""')['source-recovery'].value, '');

const transformFailure = render(JSON.stringify(markdown), {
  Transformer: class { transform() { throw new Error('Invalid mindmap'); } },
});
assert.equal(transformFailure['render-error'].hidden, false, 'Transformer errors need visible recovery');
assert.equal(transformFailure['source-recovery'].value, markdown);
console.log('PASS: missing CDN libraries and invalid payloads expose recoverable source (DOM harness only)');
