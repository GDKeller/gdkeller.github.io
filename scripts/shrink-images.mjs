#!/usr/bin/env node
// Shrink oversized source JPG/PNGs in-place. Anything wider than MAX_WIDTH is
// downscaled (preserving aspect ratio) and re-encoded at a sensible quality.
// Run manually: `node scripts/shrink-images.mjs <path-or-dir> [...]`
// Without args, defaults to the project-image folders flagged as oversized.

import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 2400;
const JPEG_QUALITY = 82;
const PNG_COMPRESSION = 9;
const EXT_WHITELIST = new Set([".jpg", ".jpeg", ".png"]);

const DEFAULT_ROOTS = [
  "public/images/projects/nhmla-anglerfish",
  "public/images/projects/jpl-minipulse",
  "public/images/projects/anglerfish",
  "src/images/projects/nhmla-anglerfish",
  "src/images/projects/jpl-minipulse",
  "src/images/projects/anglerfish",
];

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (EXT_WHITELIST.has(extname(entry.name).toLowerCase())) yield p;
  }
}

async function shrinkFile(filepath) {
  const buffer = await sharp(filepath).toBuffer();
  const meta = await sharp(buffer).metadata();
  if (!meta.width || meta.width <= MAX_WIDTH) {
    return { filepath, skipped: true, reason: `${meta.width ?? "?"}px <= ${MAX_WIDTH}px` };
  }
  const ext = extname(filepath).toLowerCase();
  let pipeline = sharp(buffer).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION });
  }
  const out = await pipeline.toBuffer();
  // Only overwrite when the new file is actually smaller.
  const origSize = (await stat(filepath)).size;
  if (out.length >= origSize) {
    return { filepath, skipped: true, reason: `re-encode ${out.length} >= original ${origSize}` };
  }
  await sharp(out).toFile(filepath);
  return {
    filepath,
    fromWidth: meta.width,
    toWidth: MAX_WIDTH,
    fromKb: Math.round(origSize / 1024),
    toKb: Math.round(out.length / 1024),
  };
}

async function main() {
  const roots = process.argv.slice(2);
  const targets = roots.length ? roots : DEFAULT_ROOTS;
  const results = [];
  for (const root of targets) {
    for await (const file of walk(root)) {
      try {
        results.push(await shrinkFile(file));
      } catch (err) {
        results.push({ filepath: file, error: err.message });
      }
    }
  }
  let shrunk = 0;
  let savedKb = 0;
  for (const r of results) {
    if (r.error) {
      console.error(`ERR  ${r.filepath}: ${r.error}`);
      continue;
    }
    if (r.skipped) {
      console.log(`skip ${r.filepath} (${r.reason})`);
      continue;
    }
    shrunk++;
    savedKb += r.fromKb - r.toKb;
    console.log(`done ${r.filepath}  ${r.fromWidth}→${r.toWidth}px  ${r.fromKb}K→${r.toKb}K`);
  }
  console.log(`\n${shrunk} file(s) shrunk, ~${savedKb}K saved.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
