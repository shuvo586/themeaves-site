// Resolves playwright from this project, falling back to the codecanyon install
// so the design loop works before `npm i` has been run here.
const CANDIDATES = ['playwright', '/var/www/html/codecanyon/node_modules/playwright'];

for (const c of CANDIDATES) {
  try {
    module.exports = require(c);
    break;
  } catch { /* try next */ }
}

if (!module.exports.chromium) {
  console.error('playwright not found. Run `npm i` in this directory.');
  process.exit(2);
}
