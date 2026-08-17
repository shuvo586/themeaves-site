// Restores the real template images into every demo page, slot by slot,
// using the original package (extracted to an OS temp dir) as the source of
// truth. Rewrites image references only; every demo-side edit stays intact.
//
//   node tools/restore-images.cjs
//
// Expects the original package extracted at
// <os.tmpdir()>/opencode/aonomy-zipref (relative paths mirror public/),
// or at the path in the AONOMY_ZIPREF environment variable.
const fs = require('fs');
const os = require('os');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const PUBLIC = path.join(__dirname, '..', 'public');
const ZIPREF = process.env.AONOMY_ZIPREF || path.join(os.tmpdir(), 'opencode', 'aonomy-zipref');
const MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
// GOOGLE_MAPS_API_VERSION is optional. The no-billing Maps Demo Key requires
// v=beta; a production key should omit it (or use weekly/quarterly).
const MAPS_VERSION = process.env.GOOGLE_MAPS_API_VERSION || '';
// --maps-key-only skips everything that reads the original package and just
// syncs GOOGLE_MAPS_API_KEY from .env into the 24 template pages.
const MAPS_ONLY = process.argv.includes('--maps-key-only');
const GMAPS_URL = (key) =>
  `https://maps.googleapis.com/maps/api/js?key=${key}${MAPS_VERSION ? `&v=${MAPS_VERSION}` : ''}&loading=async&callback=initMap`;
const GMAPS_TAG = (key) => `<script async defer src="${GMAPS_URL(key)}"></script>`;

const problems = [];
const log = (...a) => console.log(...a);

function zipOf(rel) {
  return path.join(ZIPREF, rel.split('/').join(path.sep));
}

function imgSlots(html) {
  const slots = [];
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const src = /src="([^"]*)"/i.exec(tag);
    const alt = /alt="([^"]*)"/i.exec(tag);
    slots.push({ start: m.index, end: m.index + tag.length, tag, src: src ? src[1] : '', alt: alt ? alt[1] : '' });
  }
  return slots;
}

function cssRefs(text, offset) {
  const refs = [];
  const re = /url\(["']?([^"')]+)["']?\)/g;
  let m;
  while ((m = re.exec(text))) {
    refs.push({ ref: m[1], start: offset + m.index, end: offset + m.index + m[0].length });
  }
  return refs;
}

function resolveRef(cssRel, ref) {
  const clean = ref.split('?')[0].split('#')[0];
  return path.posix.normalize(path.posix.join(path.posix.dirname(cssRel.split(path.sep).join('/')), clean));
}

// The demo build removed the Google Maps API script that the original package
// ships on every template page, and painted a static placeholder onto #map
// instead. syncGmaps restores the script tag so the real map initializes
// (initMap lives in app-*.js, which the demo never touched). The key comes
// from .env (GOOGLE_MAPS_API_KEY) and is synced on every run, so changing the
// key and re-running updates all 24 pages. Returns the (possibly rewritten)
// html so callers can inspect it afterwards.
function syncGmaps(html, page) {
  if (!html.includes('<div id="map">')) return html;
  if (!MAPS_KEY) {
    problems.push(`${page}: #map present but GOOGLE_MAPS_API_KEY is not set in .env`);
    return html;
  }
  const existing = /src="(https:\/\/maps\.googleapis\.com\/maps\/api\/js\?key=[^"]+)"/.exec(html);
  const tag = '\t' + GMAPS_TAG(MAPS_KEY);
  let out = html;
  if (existing) {
    const url = existing[1];
    const urlKey = /key=([^&]+)/.exec(url)[1];
    const stale =
      urlKey !== MAPS_KEY ||
      !url.includes('loading=async') ||
      (MAPS_VERSION && !url.includes(`v=${MAPS_VERSION}`));
    if (stale) {
      out = out.replace(url, GMAPS_URL(MAPS_KEY));
      fs.writeFileSync(path.join(PUBLIC, page), out);
      gmapsAdded++;
    }
  } else {
    const nl = out.includes('\r\n') ? '\r\n' : '\n';
    const marker = '<!-- Google maps JS -->';
    const at = out.indexOf(marker);
    out =
      at >= 0
        ? out.slice(0, at + marker.length) + nl + tag + out.slice(at + marker.length)
        : out.replace('</body>', nl + tag + nl + '</body>');
    fs.writeFileSync(path.join(PUBLIC, page), out);
    gmapsAdded++;
  }
  return out;
}

// ---------------------------------------------------------------- HTML pass
const pages = fs
  .readdirSync(PUBLIC)
  .filter((f) => f.endsWith('.html') && f !== 'index.html')
  .sort();

log(MAPS_ONLY ? `=== maps key sync: ${pages.length} template pages` : `=== HTML pass: ${pages.length} template pages`);
let htmlRewrites = 0;
let gmapsAdded = 0;

for (const page of pages) {
  // In --maps-key-only mode this is the only thing that runs.
  if (MAPS_ONLY) {
    const demoHtml = fs.readFileSync(path.join(PUBLIC, page), 'utf8');
    const out = syncGmaps(demoHtml, page);
    if (out.includes('placeholders/')) problems.push(`${page}: placeholder refs remain`);
    continue;
  }

  const demoHtml = fs.readFileSync(path.join(PUBLIC, page), 'utf8');
  const zipHtml = fs.readFileSync(zipOf(page), 'utf8');
  const demoSlots = imgSlots(demoHtml);
  const zipSlots = imgSlots(zipHtml);
  const usedZip = new Set();
  const kept = [];
  const unmatched = [];
  const rewrites = [];

  for (const slot of demoSlots) {
    if (!slot.src) continue;
    let pair = null;
    for (let i = 0; i < zipSlots.length; i++) {
      if (usedZip.has(i)) continue;
      if (zipSlots[i].alt === slot.alt && zipSlots[i].src) {
        pair = { index: i, slot: zipSlots[i] };
        usedZip.add(i);
        break;
      }
    }
    if (!pair) {
      unmatched.push(`${slot.alt || '(no alt)'} <- ${slot.src}`);
      continue;
    }
    const zSrc = pair.slot.src;
    if (slot.src === zSrc) continue;
    const isPlaceholder = slot.src.includes('assets/img/placeholders/');
    const isBlogPost = /demo\/img\/blog-[123]\.jpg/.test(slot.src);
    if (isPlaceholder && zSrc.includes('placeholders/')) {
      problems.push(`${page}: zip slot for ${slot.src} is itself a placeholder`);
      continue;
    }
    if (isPlaceholder || isBlogPost) {
      rewrites.push({ start: slot.start, end: slot.end, tag: slot.tag, from: slot.src, to: zSrc });
    } else {
      kept.push(`${slot.src} -> ${zSrc} (kept)`);
    }
  }

  rewrites.sort((x, y) => y.start - x.start);
  let out = demoHtml;
  for (const r of rewrites) {
    const newTag = r.tag.replace(/src="[^"]*"/, `src="${r.to}"`);
    out = out.slice(0, r.start) + newTag + out.slice(r.end);
  }
  if (rewrites.length) {
    fs.writeFileSync(path.join(PUBLIC, page), out);
    htmlRewrites += rewrites.length;
  }
  out = syncGmaps(out, page);
  log(
    `${page}: ${demoSlots.length} slots, ${rewrites.length} rewritten${kept.length ? `, ${kept.length} kept (${kept.join('; ')})` : ''}${
      unmatched.length ? `, UNMATCHED: ${unmatched.join(' | ')}` : ''
    }`
  );
  if (out.includes('placeholders/')) problems.push(`${page}: placeholder refs remain`);
}

// ---------------------------------------------------------------- CSS pass
// The demo sheets and the zip sheets are two builds of the same sass, and
// every sheet carries sass `/* line N, ../sass/... */` markers in both. A
// marker-aligned merge walks the zip's markers in order, finds each one in
// the demo file, and rebuilds the sheet region by region: intact demo text
// wins (this is what keeps every demo-side edit), and any region whose text
// an earlier misdirected write destroyed (placeholder refs, or unbalanced
// url() tokens from mid-token overwrites) is taken from the zip instead,
// which also restores any marker whose tail was eaten. CSS structure is never
// parsed, so destroyed braces cannot derail the alignment.
function markersOf(css) {
  const out = [];
  const re = /\/\* line \d+, \S[^*]*\*\/ ?/g;
  let m;
  while ((m = re.exec(css))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  return out;
}

function destroyedText(text) {
  if (text.includes('placeholders')) return true;
  return (text.match(/url\(/g) || []).length !== (text.match(/url\([^)]*\)/g) || []).length;
}

// A corruption test that catches what destroyedText cannot. An earlier
// misdirected write could eat property text or selector characters without
// leaving placeholders or unbalanced url() tokens (e.g. `#aonomy-download {`
// became `#aonomy-do`, `background-size: cover;` became `ba  text-align:`).
// For any region that references a template image, the demo copy and the zip
// copy are the same build compiled from the same sass, so once comments and
// whitespace are ignored they must be identical. Any difference means the
// demo copy is damaged and the zip region wins.
function norm(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasImgRef(text) {
  return /url\(["']?\.\.\/img\//.test(text);
}

function needsZip(demo, zip) {
  if (destroyedText(demo)) return true;
  if (!hasImgRef(demo) && !hasImgRef(zip)) return false;
  return norm(demo) !== norm(zip);
}

function mergeSheet(demoCss, zipCss) {
  const zMarkers = markersOf(zipCss);
  if (!zMarkers.length) return { out: demoCss, replaced: 0 };
  const pairs = [];
  let pos = 0;
  for (const zm of zMarkers) {
    let at = demoCss.indexOf(zm.text, pos);
    if (at < 0) at = demoCss.indexOf(zm.text.replace(/ \*\/$/, ''), pos);
    if (at >= 0) {
      pairs.push({ zm, at, end: at + zm.text.length });
      pos = at + zm.text.length;
    } else {
      pairs.push({ zm, at: null });
    }
  }
  let out = '';
  let replaced = 0;
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];
    const prev = i > 0 ? pairs[i - 1] : null;
    if (i === 0) {
      if (p.at != null) {
        const lead = demoCss.slice(0, p.at);
        const zLead = zipCss.slice(0, p.zm.start);
        if (needsZip(lead, zLead)) {
          out += zLead;
          replaced++;
        } else {
          out += lead;
        }
      } else {
        out += zipCss.slice(0, p.zm.start);
      }
    } else if (p.at != null && prev.at != null) {
      const dRegion = demoCss.slice(prev.end, p.at);
      const zRegion = zipCss.slice(prev.zm.end, p.zm.start);
      if (needsZip(dRegion, zRegion)) {
        out += zRegion;
        replaced++;
      } else {
        out += dRegion;
      }
    } else {
      out += zipCss.slice((prev ? prev.zm.end : 0), p.zm.start);
    }
    out += p.zm.text;
  }
  const last = pairs[pairs.length - 1];
  const zTrail = zipCss.slice(last.zm.end);
  if (last.at != null) {
    const dTrail = demoCss.slice(last.end);
    if (needsZip(dTrail, zTrail)) {
      out += zTrail;
      replaced++;
    } else {
      out += dTrail;
    }
  } else {
    out += zTrail;
  }
  return { out, replaced };
}

const cssFiles = MAPS_ONLY
  ? []
  : fs
      .readdirSync(path.join(PUBLIC, 'assets', 'css'))
      .filter((f) => f.endsWith('.css'))
      .sort();
if (!MAPS_ONLY) {
  log(`\n=== CSS pass: ${cssFiles.length} stylesheets`);

  for (const file of cssFiles) {
    const rel = `assets/css/${file}`;
    const demoCss = fs.readFileSync(path.join(PUBLIC, rel.split('/').join(path.sep)), 'utf8');
    const zipCss = fs.readFileSync(zipOf(rel), 'utf8');
    let { out, replaced } = mergeSheet(demoCss, zipCss);
    if (out !== demoCss) fs.writeFileSync(path.join(PUBLIC, rel.split('/').join(path.sep)), out);
    log(`${file}: ${replaced} destroyed regions restored from the original package`);
    if (out.includes('placeholders/')) problems.push(`${rel}: placeholder refs remain`);
    if ((out.match(/url\(/g) || []).length !== (out.match(/url\([^)]*\)/g) || []).length) {
      problems.push(`${rel}: unbalanced url() tokens remain`);
    }
  }
}

// ------------------------------------------------------------- reference scan
log('\n=== reference scan');
const referenced = new Set();
const PROTO = /^(https?:|#|mailto:|tel:|callto:|data:)/;

for (const page of pages) {
  const html = fs.readFileSync(path.join(PUBLIC, page), 'utf8');
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref = m[1];
    if (!PROTO.test(ref)) referenced.add(path.posix.normalize(ref.split('?')[0].split('#')[0]));
  }
}
for (const file of cssFiles) {
  const css = fs.readFileSync(path.join(PUBLIC, 'assets', 'css', file), 'utf8');
  for (const r of cssRefs(css, 0)) referenced.add(resolveRef(`assets/css/${file}`, r.ref));
}
const landing = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');
for (const m of landing.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = m[1];
  if (!PROTO.test(ref)) referenced.add(path.posix.normalize(ref.split('?')[0].split('#')[0]));
}
const demoCss = fs.readFileSync(path.join(PUBLIC, 'demo', 'css', 'style.css'), 'utf8');
for (const r of cssRefs(demoCss, 0)) referenced.add(resolveRef('demo/css/style.css', r.ref));

const missing = [...referenced].filter((ref) => {
  if (ref === 'assets/css/owl.video.play.png') return false; // author-package baggage: absent from the original zip too, fetched only for carousel video items (never present)
  const rel = ref.split('/').join(path.sep);
  return !fs.existsSync(path.join(PUBLIC, rel));
});
if (missing.length) {
  problems.push(`referenced but missing: ${missing.join(', ')}`);
}

const unreferenced = [];
for (const dir of ['assets/img', 'demo/img']) {
  const abs = path.join(PUBLIC, dir.split('/').join(path.sep));
  for (const f of fs.readdirSync(abs).sort()) {
    const rel = `${dir}/${f}`;
    if (!referenced.has(rel)) unreferenced.push(rel);
  }
}
log(`unreferenced in assets/img + demo/img (${unreferenced.length}):`);
for (const u of unreferenced) log(`  ${u}`);

// ------------------------------------------------------------- result
log(`\nhtml rewrites: ${htmlRewrites}`);
log(`google maps script tags added: ${gmapsAdded}`);
if (problems.length) {
  log(`\nPROBLEMS (${problems.length}):`);
  for (const p of problems) log(`  - ${p}`);
  process.exit(1);
}
log('OK: no placeholder refs remain, every reference resolves.');