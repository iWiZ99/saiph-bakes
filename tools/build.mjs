/* ==========================================================================
   SAiPH Bakes — static site generator
   Composes each page from tools/pages/<name>.html + shared partials, resolves icon
   and logo placeholders, writes SEO files. No dependencies.

       node tools/build.mjs

   Output is plain static HTML — open index.html directly or serve the folder.
   ========================================================================== */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORY_PAGES, LOCATION_PAGES } from "./collections.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/* Canonical origin for canonicals, OG tags, JSON-LD and the sitemap.
   Override when the real domain is connected:  SITE_URL=https://www.saiphbakes.com node tools/build.mjs */
const SITE = (process.env.SITE_URL || "https://saiph-bakes.vercel.app").replace(/\/+$/, "");
const P = (...p) => join(ROOT, ...p);
const read = (...p) => readFileSync(P(...p), "utf8");

/* ----------------------------- Icon registry -----------------------------
   Mirrors the subset of SAIPH.ui.icons needed at build time so server-rendered
   chrome matches client-rendered components exactly.
   ----------------------------------------------------------------------- */
const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  heart: '<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  caret: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mappin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  truck: '<path d="M1 3h11v13H1z"/><path d="M12 8h5l4 4v4h-9z"/><circle cx="5.5" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/>',
  check: '<path d="m5 13 4 4L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  cake: '<path d="M3 20h18"/><path d="M4 20v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6"/><path d="M12 8V5"/><path d="M12 5a1.6 1.6 0 0 0 0-3 1.6 1.6 0 0 0 0 3z"/><path d="M4 15c2 1.4 3.6 1.4 5.3 0 1.7 1.4 3.4 1.4 5.4 0 1.6 1.4 3.3 1.4 5.3 0"/>',
  gift: '<path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 21V7"/><path d="M12 7S9.5 7 8 5.5A2.5 2.5 0 0 1 12 3a2.5 2.5 0 0 1 4 2.5C14.5 7 12 7 12 7z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-4 16-9 16z"/><path d="M4 21c3-6 7-9 12-11"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-2.6 5 2.6-1.5-7"/>',
  shield: '<path d="M12 22s8-3.4 8-10V5.5L12 2 4 5.5V12c0 6.6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M5 15l.6 1.6L7.2 17l-1.6.6L5 19.2l-.6-1.6L2.8 17l1.6-.4z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
  chef: '<path d="M6 21h12v-7H6z"/><path d="M6 14a4 4 0 0 1-1-7.9A4.5 4.5 0 0 1 12 3.5a4.5 4.5 0 0 1 7 2.6A4 4 0 0 1 18 14"/>',
  wheat: '<path d="M12 22V9"/><path d="M12 9c0-3 2-5 5-5 0 3-2 5-5 5z"/><path d="M12 9c0-3-2-5-5-5 0 3 2 5 5 5z"/><path d="M12 15c0-3 2-5 5-5 0 3-2 5-5 5z"/><path d="M12 15c0-3-2-5-5-5 0 3 2 5 5 5z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  store: '<path d="M3 9v11h18V9"/><path d="m2 9 2.5-5h15L22 9z"/><path d="M9 20v-6h6v6"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20"/>',
  trending: '<path d="m3 17 6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
  headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 15h3v6H5a1 1 0 0 1-1-1zM20 15h-3v6h2a1 1 0 0 0 1-1z"/>',
  package: '<path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="M7.5 4.5 16.5 9.5M3 7l9 5 9-5"/><path d="M12 12v10"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.4"/><circle cx="17" cy="17" r="2.4"/>',
  mail: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  message: '<path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-5A8 8 0 1 1 21 12z"/>',
  play: '<path d="M7 4l12 8-12 8z"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
  thermometer: '<path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M14 9V7a2 2 0 0 1 2-2h2V2h-3a5 5 0 0 0-5 5v2H8v3h2v10h4V12h3l.5-3z"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  pinterest: '<circle cx="12" cy="12" r="9"/><path d="M9.5 20c1-2 1.4-3.6 1.8-5.4"/><path d="M8.5 11.5c0-2.2 1.7-4 4-4s3.5 1.5 3.5 3.6c0 2.4-1.4 4.2-3.2 4.2-1 0-1.7-.8-1.4-1.8"/>',
  linkedin: '<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M10 21V9h4v1.8A4 4 0 0 1 22 14v7h-4v-6a2 2 0 0 0-4 0v6z"/>',
  whatsapp: '<path d="M20 12a8 8 0 0 1-11.8 7L3 21l2-5.2A8 8 0 1 1 20 12z"/>',
  upload: '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M12 3v12M8 7l4-4 4 4"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
  star: '<path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z"/>',
  arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  eye: '<path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12S19 18.5 12 18.5 1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  tag: '<path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 19 5-5 3 3 3-3 5 5"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  key: '<path d="m21 2-2 2m-1.5 1.5L16 7l-4 4-2-2-4 4 2 2-3 3-2-2-2 2 3 3 7-7 4-4"/>',
  cart: '<circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h2.4l2.6 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>'
};

const icon = (name, cls) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${cls ? ` class="${cls}"` : ""}>${ICON_PATHS[name]}</svg>`;

/* ------------------------- Build-time placeholder art -------------------
   Same composition rules as SAIPH.ui.art so statically rendered frames match
   the client-rendered ones.
   ----------------------------------------------------------------------- */
const MOTIFS = {
  cake: '<path d="M18 78h64M24 78V52a8 8 0 0 1 8-8h36a8 8 0 0 1 8 8v26M24 60c6 4 11 4 16 0s10 4 16 0 10 4 16 0M50 44V30M50 30a4 4 0 0 0 0-8 4 4 0 0 0 0 8" />',
  croissant: '<path d="M14 60c8-22 30-34 52-30 8 1.5 12 8 10 15-3 10-14 18-30 21-12 2.5-24 0-32-6z"/><path d="M28 52c6 4 14 6 22 5M36 40c4 5 10 8 17 9M22 62c5 3 12 4 18 3"/>',
  cookie: '<circle cx="50" cy="50" r="26"/><circle cx="42" cy="42" r="3.2"/><circle cx="57" cy="46" r="2.6"/><circle cx="47" cy="58" r="3"/><circle cx="60" cy="58" r="2.2"/><circle cx="38" cy="55" r="2"/>',
  bread: '<path d="M20 62c0-14 13-24 30-24s30 10 30 24a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z"/><path d="M36 44l-6 12M50 40l-6 14M64 44l-6 12"/>',
  chocolate: '<rect x="26" y="28" width="48" height="44" rx="3"/><path d="M26 43h48M26 57h48M42 28v44M58 28v44"/>',
  tart: '<path d="M20 56h60l-4 10a6 6 0 0 1-6 4H30a6 6 0 0 1-6-4z"/><path d="M24 56c2-14 12-22 26-22s24 8 26 22"/><circle cx="42" cy="48" r="3"/><circle cx="56" cy="45" r="3"/><circle cx="50" cy="53" r="2.4"/>',
  hamper: '<rect x="22" y="42" width="56" height="34" rx="4"/><path d="M22 54h56"/><path d="M50 42v34"/><path d="M50 42c-6-10-16-12-20-6 3 5 12 6 20 6zM50 42c6-10 16-12 20-6-3 5-12 6-20 6z"/>',
  tea: '<path d="M50 78V44"/><path d="M50 44c0-12 8-20 20-20 0 12-8 20-20 20z"/><path d="M50 52c0-11-8-18-18-18 0 11 8 18 18 18z"/><path d="M32 78h36"/>',
  cupcake: '<path d="M30 52h40l-6 26H36z"/><path d="M28 52c0-10 10-16 22-16s22 6 22 16z"/><path d="M50 36V26M50 26a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>',
  bonbon: '<path d="M22 66a28 28 0 0 1 56 0z"/><path d="M22 66h56"/><path d="M36 52c4-6 10-9 14-9M56 46c4 2 7 5 9 9"/>',
  coffee: '<path d="M24 40h40v20a14 14 0 0 1-14 14H38a14 14 0 0 1-14-14z"/><path d="M64 44h6a8 8 0 0 1 0 16h-6"/><path d="M22 80h48"/>',
  chef: '<path d="M32 78h36V52H32z"/><path d="M32 52a12 12 0 0 1-3-23.6A13.5 13.5 0 0 1 50 22a13.5 13.5 0 0 1 21 7.8A12 12 0 0 1 68 52"/>',
  store: '<path d="M22 40v38h56V40"/><path d="m18 40 7-16h50l7 16z"/><path d="M40 78V58h20v20"/>',

  default: '<circle cx="50" cy="50" r="24"/><path d="M50 26v48M26 50h48"/>'
};

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function art(seed, tones = TONES.saiph, motif = "default") {
  const h = hash(seed);
  const id = "b" + (h % 100000);
  const ax = 16 + (h % 30), ay = 12 + ((h >> 3) % 26);
  const bx = 56 + ((h >> 5) % 32), by = 54 + ((h >> 7) % 30);
  const rot = ((h >> 9) % 14) - 7;
  const scale = (30 + ((h >> 11) % 9)) / 100;
  const ring = 20 + ((h >> 13) % 4);
  const m = MOTIFS[motif] || MOTIFS.default;
  const emblem = `translate(50 50) rotate(${rot}) scale(${scale}) translate(-50 -50)`;
  return `<svg class="media__art" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${tones[0]}"/><stop offset="55%" stop-color="${tones[1]}"/><stop offset="100%" stop-color="${tones[2]}"/></linearGradient><radialGradient id="${id}r1"><stop offset="0%" stop-color="${tones[2]}" stop-opacity=".55"/><stop offset="100%" stop-color="${tones[2]}" stop-opacity="0"/></radialGradient><radialGradient id="${id}r2"><stop offset="0%" stop-color="${tones[0]}" stop-opacity=".75"/><stop offset="100%" stop-color="${tones[0]}" stop-opacity="0"/></radialGradient><radialGradient id="${id}v" cx="50%" cy="46%" r="62%"><stop offset="55%" stop-color="${tones[0]}" stop-opacity="0"/><stop offset="100%" stop-color="${tones[0]}" stop-opacity=".5"/></radialGradient></defs><rect width="100" height="100" fill="url(#${id}g)"/><circle cx="${ax}" cy="${ay}" r="40" fill="url(#${id}r1)"/><circle cx="${bx}" cy="${by}" r="44" fill="url(#${id}r2)"/><circle cx="50" cy="50" r="${ring}" fill="none" stroke="${tones[2]}" stroke-opacity=".16" stroke-width=".5"/><g transform="${emblem}" fill="none" stroke="${tones[2]}" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${m}</g><rect width="100" height="100" fill="url(#${id}v)"/></svg>`;
}

/* Mirrors SAIPH.data.tones in assets/js/data.js — keep the two in step. */
const TONES = {
  saiph: ["#1b2a45", "#a98a52", "#f2e6d0"],
  signature: ["#100d12", "#2b2028", "#d8be85"],
  doughremi: ["#5e3a20", "#c08a50", "#f6e7d2"],
  khowdy: ["#22402c", "#7d6140", "#e9e3cd"]
};

function frame(seed, brand, motif, ratio = "landscape", opts = {}) {
  return `<div class="media media--${ratio}${opts.className ? " " + opts.className : ""}">${art(seed, TONES[brand] || TONES.saiph, motif)}<span class="media__grain"></span>${opts.scrim ? `<span class="media__scrim${opts.scrim === "full" ? " media__scrim--full" : ""}"></span>` : ""}</div>`;
}

/* ------------------------------- Partials ------------------------------- */
const LOGO = read("tools/partials/logo.html").trim();

function resolveTokens(html) {
  return html
    .replace(/\{\{LOGO\}\}/g, LOGO)
    .replace(/\{\{FEATURE_MEDIA\}\}/g, frame("pistachio-kunafa-croissant", "signature", "croissant", "landscape"))
    .replace(/\{\{ICON_([A-Z]+)\}\}/g, (_, name) => {
      const key = Object.keys(ICON_PATHS).find(k => k.toLowerCase() === name.toLowerCase());
      if (!key) throw new Error("Unknown icon token: ICON_" + name);
      return icon(key);
    })
    .replace(/\{\{ART:([a-z0-9-]+):([a-z]+):([a-z]+):([a-z]+)\}\}/g, (_, seed, brand, motif, ratio) =>
      frame(seed, brand, motif, ratio))
    .replace(/\{\{ARTS:([a-z0-9-]+):([a-z]+):([a-z]+):([a-z]+)\}\}/g, (_, seed, brand, motif, ratio) =>
      frame(seed, brand, motif, ratio, { scrim: true }))
    .replace(/\{\{RAW:([a-z0-9-]+):([a-z]+):([a-z]+)\}\}/g, (_, seed, brand, motif) =>
      art(seed, TONES[brand] || TONES.saiph, motif) + '<span class="media__grain"></span>');
}

const HEAD = read("tools/partials/head.html");
const HEADER = resolveTokens(read("tools/partials/header.html"));
const FOOTER = resolveTokens(read("tools/partials/footer.html"));
const OVERLAYS = resolveTokens(read("tools/partials/overlays.html"));

/* -------------------------------- Pages --------------------------------- */
const PAGES = [
  {
    file: "index.html", page: "home", priority: "1.0",
    title: "SAiPH Bakes — Premium Bakery, Luxury Pâtisserie & Assam-Inspired Foods",
    desc: "Crafting moments worth celebrating. Order freshly baked cakes, luxury desserts, croissants, chocolates and Assam-inspired snacks from SAiPH Bakes — home of DoughReMi, SAiPH Signature and Khowdy. Same-day delivery in Dibrugarh.",
    scripts: ["page-home.js"], trail: []
  },
  {
    file: "shop.html", page: "shop", priority: "0.9",
    title: "Shop All — Cakes, Pastries, Chocolates & Hampers | SAiPH Bakes",
    desc: "Browse the full SAiPH Bakes catalogue: birthday and celebration cakes, croissants, brownies, chocolates, cookies, breads, hampers and Assamese specialities. Filter by brand, occasion, diet and price.",
    scripts: ["page-shop.js"], trail: ["Shop"]
  },
  {
    file: "product.html", page: "product", priority: "0.8", robots: "noindex,follow",
    title: "Product — SAiPH Bakes",
    desc: "Product details, ingredients, allergens, delivery windows and reviews for every SAiPH Bakes creation.",
    scripts: ["page-product.js"], trail: ["Shop", "Product"], bodyClass: "pdp-page"
  },
  {
    file: "cakes.html", page: "cakes", priority: "0.9",
    title: "Create Your Cake — Personalised Cakes | SAiPH Bakes",
    desc: "Design a custom cake in minutes: choose occasion, size, flavour, message, personalisation and delivery date. Birthday, anniversary, wedding, baby shower, graduation and corporate cakes from SAiPH Bakes.",
    scripts: ["page-cakes.js"], trail: ["Cakes"]
  },
  {
    file: "brand-doughremi.html", page: "brand", priority: "0.8", brand: "doughremi",
    title: "DoughReMi by SAiPH Bakes — Everyday Bakery & Café",
    desc: "Fresh breads, croissants, pastries, cakes and coffee baked through the day. DoughReMi is the everyday bakery and café brand of SAiPH Bakes.",
    scripts: ["page-brand.js"], trail: ["Our Brands", "DoughReMi"]
  },
  {
    file: "brand-signature.html", page: "brand", priority: "0.8", brand: "signature",
    title: "SAiPH Signature by SAiPH Bakes — Luxury Pâtisserie & Entremets",
    desc: "Handcrafted entremets, celebration cakes, bonbons and gold-leaf desserts. SAiPH Signature is the luxury pâtisserie brand of SAiPH Bakes, finished by hand and numbered by batch.",
    scripts: ["page-brand.js"], trail: ["Our Brands", "SAiPH Signature"]
  },
  {
    file: "brand-khowdy.html", page: "brand", priority: "0.8", brand: "khowdy",
    title: "Khowdy — Assam-Inspired Cookies & Healthy Foods | SAiPH Bakes",
    desc: "Assam tea cookies, black rice cookies, millet cookies, single-estate tea and regional snack boxes. Khowdy is the naturally made packaged food brand of SAiPH Bakes. No palm oil.",
    scripts: ["page-brand.js"], trail: ["Our Brands", "Khowdy"]
  },
  {
    file: "gifting.html", page: "gifting", priority: "0.8",
    title: "Gifting & Hampers — Give Something Extraordinary | SAiPH Bakes",
    desc: "Premium gift hampers, chocolate boxes, corporate gifting, festival collections, wedding favours and Assam tea sets. Pan-India dispatch and per-address delivery from SAiPH Bakes.",
    scripts: ["page-gifting.js"], trail: ["Gifting"]
  },
  {
    file: "cart.html", page: "cart", priority: "0.4", robots: "noindex,nofollow",
    title: "Your Cart — SAiPH Bakes",
    desc: "Review your SAiPH Bakes order, apply a coupon and choose delivery or store pickup.",
    scripts: ["page-cart.js"], trail: ["Cart"]
  },
  {
    file: "checkout.html", page: "checkout", priority: "0.4", robots: "noindex,nofollow",
    title: "Secure Checkout — SAiPH Bakes",
    desc: "Choose delivery or pickup, pick a date and slot, and pay securely by UPI, card or net banking.",
    scripts: ["page-checkout.js"], trail: ["Cart", "Checkout"]
  },
  {
    file: "order-confirmation.html", page: "confirmation", priority: "0.2", robots: "noindex,nofollow",
    title: "Order Confirmed — SAiPH Bakes",
    desc: "Your SAiPH Bakes order is confirmed and on its way to the kitchen.",
    scripts: ["page-confirmation.js"], trail: ["Order Confirmed"]
  },
  {
    file: "track-order.html", page: "track", priority: "0.5",
    title: "Track Your Order — SAiPH Bakes",
    desc: "Follow your SAiPH Bakes order from kitchen to doorstep with live status updates.",
    scripts: ["page-track.js"], trail: ["Track Order"]
  },
  {
    file: "wishlist.html", page: "wishlist", priority: "0.4", robots: "noindex,follow",
    title: "Your Wishlist — SAiPH Bakes",
    desc: "Everything you have saved for later, ready to add to cart.",
    scripts: ["page-wishlist.js"], trail: ["Wishlist"]
  },
  {
    file: "account.html", page: "account", priority: "0.4", robots: "noindex,nofollow",
    title: "My Account — Orders, Addresses & Subscriptions | SAiPH Bakes",
    desc: "Manage your SAiPH Bakes orders, saved addresses, wishlist, subscriptions and gift card balance.",
    scripts: ["page-account.js"], trail: ["My Account"]
  },
  {
    file: "stores.html", page: "stores", priority: "0.8",
    title: "Visit Us in Dibrugarh | SAiPH Bakes",
    desc: "Visit SAiPH Bakes on RKB Path, Chowkidinghee, Dibrugarh. Opening hours, phone number, directions and free store pickup.",
    scripts: ["page-stores.js"], trail: ["Stores"]
  },
  {
    file: "about.html", page: "about", priority: "0.7",
    title: "About SAiPH Bakes — Craftsmanship, Quality, Innovation, Hospitality",
    desc: "The story of SAiPH Bakes: a modern bakery and food company from Assam building three consumer brands around one standard of craft. Inside our craft bakery, chefs and sourcing.",
    scripts: ["page-about.js"], trail: ["About"]
  },
  {
    file: "corporate.html", page: "corporate", priority: "0.8",
    title: "Corporate Orders & Employee Gifting | SAiPH Bakes",
    desc: "Corporate cakes, employee gifting, meeting snacks, bulk bakery orders, premium hampers and custom branded gifts with GST invoicing and 30-day credit. Request a corporate quote.",
    scripts: ["page-forms.js"], trail: ["Business", "Corporate Orders"]
  },
  {
    file: "wholesale.html", page: "wholesale", priority: "0.8",
    title: "Wholesale & Distribution Supply | SAiPH Bakes",
    desc: "Wholesale bakery supply and distribution for hotels, restaurants, cafés, supermarkets, schools, institutions and retailers. Par-bake, private label and territory distributorships.",
    scripts: ["page-forms.js"], trail: ["Business", "Wholesale"]
  },
  {
    file: "franchise.html", page: "franchise", priority: "0.9",
    title: "SAiPH Bakes Franchise — Build The Next SAiPH With Us",
    desc: "Franchise opportunities across four store formats from ₹12 lakh kiosks to full flagships. Investment, training, marketing, supply chain, technology and territory availability.",
    scripts: ["page-forms.js"], trail: ["Franchise"]
  },
  {
    file: "contact.html", page: "contact", priority: "0.6",
    title: "Contact SAiPH Bakes — Orders, Support & Enquiries",
    desc: "Call, WhatsApp or email SAiPH Bakes for orders, delivery support, corporate enquiries, wholesale supply and franchise opportunities.",
    scripts: ["page-forms.js"], trail: ["Contact"]
  },
  {
    file: "faq.html", page: "faq", priority: "0.6",
    title: "FAQs — Orders, Delivery & Customisation | SAiPH Bakes",
    desc: "Answers on cake lead times, delivery slots and cities, eggless options, custom cakes, GST invoices, allergens, subscriptions and gift cards.",
    scripts: ["page-faq.js"], trail: ["FAQs"], faq: true
  },
  {
    file: "blog.html", page: "blog", priority: "0.6",
    title: "The SAiPH Journal — Craft, Sourcing & Kitchen Notes",
    desc: "Notes from the SAiPH craft bakery: lamination, Assam tea sourcing, eggless technique and the unforgiving physics of mirror glaze.",
    scripts: ["page-blog.js"], trail: ["Journal"]
  },
  {
    file: "careers.html", page: "careers", priority: "0.5",
    title: "Careers at SAiPH Bakes — Bakers, Chefs, Retail & Operations",
    desc: "Join a growing premium bakery company. Open roles across production, pâtisserie, retail, supply chain and marketing at our Dibrugarh shop and kitchen.",
    scripts: ["page-forms.js"], trail: ["Careers"]
  },
  {
    file: "shipping.html", page: "legal", priority: "0.4",
    title: "Shipping & Delivery Policy — SAiPH Bakes",
    desc: "Delivery cities, slots, cutoff times, charges, cold-chain handling and pan-India dispatch for SAiPH Bakes orders.",
    scripts: [], trail: ["Shipping & Delivery"]
  },
  {
    file: "returns.html", page: "legal", priority: "0.4",
    title: "Returns & Refunds Policy — SAiPH Bakes",
    desc: "How SAiPH Bakes handles damaged, incorrect or unsatisfactory orders, replacement windows and refund timelines.",
    scripts: [], trail: ["Returns & Refunds"]
  },
  {
    file: "privacy.html", page: "legal", priority: "0.3",
    title: "Privacy Policy — SAiPH Bakes",
    desc: "What data SAiPH Bakes collects, how it is used, who it is shared with, and how to exercise your rights.",
    scripts: [], trail: ["Privacy Policy"]
  },
  {
    file: "terms.html", page: "legal", priority: "0.3",
    title: "Terms & Conditions — SAiPH Bakes",
    desc: "Terms governing use of the SAiPH Bakes website, orders, pricing, cancellations, gift cards and intellectual property.",
    scripts: [], trail: ["Terms & Conditions"]
  },
  {
    file: "404.html", page: "notfound", priority: null, robots: "noindex,nofollow",
    title: "Page Not Found — SAiPH Bakes",
    desc: "That page has been eaten. Here is the way back to the good stuff.",
    scripts: ["page-404.js"], trail: []
  }
];

/* ------------------------------ Assembly -------------------------------- */
const SHELL = (p, content) => `<!doctype html>
<html lang="en-IN"${p.brand ? ` data-brand="${p.brand}"` : ""} class="no-js">
<head>
${HEAD
  .replace(/\{\{TITLE\}\}/g, p.title.replace(/"/g, "&quot;"))
  .replace(/\{\{DESC\}\}/g, p.desc.replace(/"/g, "&quot;"))
  .replace(/\{\{SITE\}\}/g, SITE)
  .replace(/\{\{FILE\}\}/g, p.file === "index.html" ? "" : p.file)
  .replace(/\{\{ROBOTS\}\}/g, p.robots || "index,follow,max-image-preview:large")
  .replace(/\{\{OGTYPE\}\}/g, p.page === "product" ? "product" : "website")
  .replace(/\{\{JSONLD\}\}/g, p.jsonld || "")
  .trim()}
</head>
<body class="${p.bodyClass || ""}" data-page="${p.page}"${p.brand ? ` data-brand="${p.brand}"` : ""}>
${HEADER}

<main id="main">
${content.trim()}
</main>

${FOOTER}
${OVERLAYS}

<script src="assets/js/data.js"></script>
<script src="assets/js/store.js"></script>
<script src="assets/js/ui.js"></script>
<script src="assets/js/blocks.js"></script>
${(p.scripts || []).map(s => `<script src="assets/js/${s}"></script>`).join("\n")}
<script src="assets/js/app.js"></script>
</body>
</html>
`;

/* --------------------------------- Run ---------------------------------- */
let built = 0;
const missing = [];

for (const p of PAGES) {
  const src = P("tools/pages", p.file);
  if (!existsSync(src)) { missing.push(p.file); continue; }
  const content = resolveTokens(readFileSync(src, "utf8"));
  writeFileSync(P(p.file), SHELL(p, content), "utf8");
  built++;
}

/* Admin console is a separate shell (its own chrome, no storefront header). */
const adminSrc = P("tools/pages/admin.html");
if (existsSync(adminSrc)) {
  if (!existsSync(P("admin"))) mkdirSync(P("admin"));
  const adminHead = HEAD
    .replace(/\{\{TITLE\}\}/g, "SAiPH Bakes — Admin Console")
    .replace(/\{\{DESC\}\}/g, "Role-based administration for products, orders, inventory, delivery slots, stores, coupons, content and enquiries.")
    .replace(/\{\{SITE\}\}/g, SITE)
    .replace(/\{\{FILE\}\}/g, "admin/index.html")
    .replace(/\{\{ROBOTS\}\}/g, "noindex,nofollow")
    .replace(/\{\{OGTYPE\}\}/g, "website")
    .replace(/\{\{JSONLD\}\}/g, "")
    .replace(/href="assets\//g, 'href="../assets/')
    .replace(/href="manifest/g, 'href="../manifest')
    .trim();
  const adminBody = resolveTokens(readFileSync(adminSrc, "utf8"));
  writeFileSync(P("admin/index.html"), `<!doctype html>
<html lang="en-IN" class="no-js">
<head>
${adminHead}
</head>
<body data-page="admin">
${adminBody.trim()}
<script src="../assets/js/data.js"></script>
<script src="../assets/js/store.js"></script>
<script src="../assets/js/ui.js"></script>
<script src="../assets/js/blocks.js"></script>
<script src="../assets/js/page-admin.js"></script>
<script src="../assets/js/app.js"></script>
</body>
</html>
`, "utf8");
  built++;
}

/* --------------------- Generated SEO landing pages -----------------------
   Static category and city pages: real copy in the HTML, FAQ + breadcrumb
   schema, internal links, and a product grid hydrated by page-collection.js.
   ----------------------------------------------------------------------- */
const seoUrls = [];

const faqSchema = (faqs) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
});

const crumbSchema = (name, file) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE}/shop.html` },
    { "@type": "ListItem", position: 3, name, item: `${SITE}/${file}` }
  ]
});

const faqBlock = (faqs) => `
<section class="section section--tinted">
  <div class="shell shell--narrow">
    <div class="section-head section-head--center">
      <span class="eyebrow">Questions</span>
      <h2>Good to know</h2>
    </div>
    <div class="accordion" data-accordion="single">
      ${faqs.map((f, i) => `<div class="accordion__item${i === 0 ? " is-open" : ""}">
        <button class="accordion__btn" type="button" aria-expanded="${i === 0}"><span>${f.q}</span><i aria-hidden="true"></i></button>
        <div class="accordion__panel"><div class="accordion__inner">${f.a}</div></div>
      </div>`).join("\n      ")}
    </div>
  </div>
</section>`;

const withSchema = (html, faqs, name, file) =>
  html.replace("</head>",
    `<script type="application/ld+json">${faqSchema(faqs)}</script>\n` +
    `<script type="application/ld+json">${crumbSchema(name, file)}</script>\n</head>`);

for (const c of CATEGORY_PAGES) {
  const body = `
<section class="page-head page-head--hero">
  <div class="page-head__bg" aria-hidden="true">${art(c.art[0], TONES[c.art[1]], c.art[2])}<span class="media__grain"></span></div>
  <div class="shell">
    <nav aria-label="Breadcrumb">
      <ol class="crumbs" style="color:rgba(251,246,236,.7)">
        <li><a href="index.html">Home</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li aria-current="page">${c.h1}</li>
      </ol>
    </nav>
    <div class="page-head__inner">
      <span class="eyebrow" style="color:var(--gold-300)">Collection</span>
      <h1 class="display">${c.h1}</h1>
      <p class="lede" style="color:rgba(251,246,236,.82)">${c.lede}</p>
      <div class="row" style="padding-top:.5rem">
        <a class="btn btn--accent" href="#collection" data-scroll-to="#collection">Shop the collection</a>
        <a class="btn btn--light" href="cakes.html">Create your cake</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight" id="collection">
  <div class="shell">
    <div class="section-head section-head--split">
      <div class="section-head__copy">
        <span class="eyebrow">Shop</span>
        <h2>Available now</h2>
      </div>
      <a class="link" href="shop.html?cat=${c.cat}">See all in the catalogue ${icon("arrowRight")}</a>
    </div>
    <div class="product-grid" data-collection="${[c.cat].concat(c.extraCats || []).join(",")}"></div>
  </div>
</section>

<section class="section section--tinted">
  <div class="shell shell--narrow">
    <div class="legal prose">
      ${c.sections.map(sec => `<h2>${sec.h2}</h2>
      <p>${sec.p}</p>
      ${sec.list ? `<ul>${sec.list.map(li => `<li>${li}</li>`).join("")}</ul>` : ""}`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="shell trust-strip">
    <div class="trust">${icon("chef")}<div><p class="trust__title">Handcrafted daily</p><p class="trust__note">Made in our Dibrugarh craft bakery</p></div></div>
    <div class="trust">${icon("truck")}<div><p class="trust__title">Slot-timed delivery</p><p class="trust__note">Two-hour windows across Dibrugarh</p></div></div>
    <div class="trust">${icon("shield")}<div><p class="trust__title">Replace or refund</p><p class="trust__note">Report within four hours, no argument</p></div></div>
    <div class="trust">${icon("percent")}<div><p class="trust__title">Free above ₹999</p><p class="trust__note">Store pickup always free</p></div></div>
  </div>
</section>
${faqBlock(c.faqs)}
<section class="section">
  <div class="shell">
    <div class="section-head section-head--center">
      <span class="eyebrow">Keep exploring</span>
      <h2 style="font-size:var(--fs-h3)">Related collections</h2>
    </div>
    <div class="grid grid--3">
      ${c.related.map(r => {
        const target = CATEGORY_PAGES.find(x => x.file === r) || LOCATION_PAGES.find(x => x.file === r);
        return `<a class="card card--pad card--lift" href="${r}">
        <span class="eyebrow">Collection</span>
        <h3 class="value__title" style="margin:.35rem 0 .5rem">${target ? target.h1 : r}</h3>
        <p class="value__text">${target ? target.lede : ""}</p>
        <span class="link" style="margin-top:.75rem">Explore ${icon("arrowRight")}</span></a>`;
      }).join("\n      ")}
    </div>
  </div>
</section>`;

  const page = { file: c.file, page: "collection", title: c.title, desc: c.desc, scripts: ["page-collection.js"] };
  writeFileSync(P(c.file), withSchema(SHELL(page, body), c.faqs, c.h1, c.file), "utf8");
  seoUrls.push({ file: c.file, priority: "0.8", page: "collection" });
  built++;
}

for (const l of LOCATION_PAGES) {
  const body = `
<section class="page-head page-head--hero">
  <div class="page-head__bg" aria-hidden="true">${art("city-" + l.city.toLowerCase(), TONES.saiph, "cake")}<span class="media__grain"></span></div>
  <div class="shell">
    <nav aria-label="Breadcrumb">
      <ol class="crumbs" style="color:rgba(251,246,236,.7)">
        <li><a href="index.html">Home</a></li>
        <li><a href="stores.html">Stores</a></li>
        <li aria-current="page">${l.city}</li>
      </ol>
    </nav>
    <div class="page-head__inner">
      <span class="eyebrow" style="color:var(--gold-300)">${l.city}</span>
      <h1 class="display">${l.h1}</h1>
      <p class="lede" style="color:rgba(251,246,236,.82)">${l.lede}</p>
      <div class="row" style="padding-top:.5rem">
        <a class="btn btn--accent" href="shop.html">Order now</a>
        <a class="btn btn--light" href="cakes.html">Create your cake</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="shell">
    <div class="grid grid--4">
      ${l.highlights.map(h => `<article class="value">
        <span class="value__icon">${icon("checkCircle")}</span>
        <h2 class="value__title">${h.t}</h2>
        <p class="value__text">${h.d}</p>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="shell shell--narrow">
    <div class="legal prose">
      <h2>Ordering in ${l.city}</h2>
      <p>${l.intro}</p>
      <h2>Areas we deliver to in ${l.city}</h2>
      <p>${l.areas.join(" &middot; ")} — and the surrounding neighbourhoods. Serviceability is confirmed by PIN code at checkout, and if your address falls outside rider coverage we call you before dispatch rather than cancelling silently.</p>
    </div>
  </div>
</section>

<section class="section section--tinted">
  <div class="shell">
    <div class="section-head section-head--split">
      <div class="section-head__copy">
        <span class="eyebrow">Stores</span>
        <h2>Our counters in ${l.city}</h2>
      </div>
      <a class="link" href="stores.html">All stores ${icon("arrowRight")}</a>
    </div>
    <div class="store-grid" data-city-stores="${l.storeIds.join(",")}"></div>
  </div>
</section>

<section class="section">
  <div class="shell">
    <div class="section-head section-head--split">
      <div class="section-head__copy">
        <span class="eyebrow">Popular in ${l.city}</span>
        <h2>What people order here</h2>
      </div>
      <a class="link" href="shop.html?badge=BESTSELLER">All bestsellers ${icon("arrowRight")}</a>
    </div>
    <div class="product-grid" data-collection-bestsellers></div>
  </div>
</section>
${faqBlock(l.faqs)}`;

  const page = { file: l.file, page: "collection", title: l.title, desc: l.desc, scripts: ["page-collection.js"] };
  writeFileSync(P(l.file), withSchema(SHELL(page, body), l.faqs, l.h1, l.file), "utf8");
  seoUrls.push({ file: l.file, priority: "0.7", page: "collection" });
  built++;
}

/* ------------------------------ SEO files ------------------------------- */
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.filter(p => p.priority)
  .map(p => ({ file: p.file, priority: p.priority, page: p.page }))
  .concat(seoUrls)
  .map(p => `  <url>
    <loc>${SITE}/${p.file === "index.html" ? "" : p.file}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.page === "home" || p.page === "shop" ? "daily" : "weekly"}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n");

writeFileSync(P("sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, "utf8");

writeFileSync(P("robots.txt"), `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /cart.html
Disallow: /checkout.html
Disallow: /order-confirmation.html
Disallow: /account.html

Sitemap: ${SITE}/sitemap.xml
`, "utf8");

writeFileSync(P("manifest.webmanifest"), JSON.stringify({
  name: "SAiPH Bakes",
  short_name: "SAiPH",
  description: "Premium bakery, luxury pâtisserie and Assam-inspired foods.",
  start_url: "/index.html",
  display: "standalone",
  background_color: "#670E10",
  theme_color: "#670E10",
  icons: [{ src: "/assets/img/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }]
}, null, 2) + "\n", "utf8");

console.log(`✓ built ${built} page(s)`);
if (missing.length) console.log("  pending fragments: " + missing.join(", "));
console.log("✓ sitemap.xml, robots.txt, manifest.webmanifest");
