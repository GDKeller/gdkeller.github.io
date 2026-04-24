#!/usr/bin/env node
/**
 * Validate --color-* tokens in src/styles/global.css.
 * Flags unparseable values and those outside the sRGB / Display P3 gamut
 * (browsers silently clamp out-of-gamut values, hiding typos like chroma 1.9).
 *
 * Usage:
 *   node scripts/check-oklch.mjs                     # report only
 *   node scripts/check-oklch.mjs --fix               # clamp out-of-P3 to P3
 *   node scripts/check-oklch.mjs --fix --target=srgb # also clamp P3-only to sRGB
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parse, displayable, clampChroma } from "culori";

const args = process.argv.slice(2);
const shouldFix = args.includes("--fix");
const targetArg = args.find((a) => a.startsWith("--target="));
const target = targetArg ? targetArg.split("=")[1] : "p3";

if (!["srgb", "p3"].includes(target)) {
  console.error(`Invalid --target=${target}. Use 'srgb' or 'p3'.`);
  process.exit(2);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = resolve(__dirname, "../src/styles/global.css");
const original = readFileSync(cssPath, "utf8");

const TOKEN_RE = /(--color-([\w-]+):\s*)(oklch\([^)]+\))/g;
const OKLCH_RE = /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/;

const results = {
  ok: [],
  outOfSrgb: [],
  outOfP3: [],
  malformed: [],
  fixed: [],
};

const formatOklch = ({ l, c, h }) => {
  const lStr = `${+(l * 100).toFixed(2)}%`;
  const cStr = +c.toFixed(4);
  const hStr = +(h ?? 0).toFixed(2);
  return `oklch(${lStr} ${cStr} ${hStr})`;
};

const updated = original.replace(TOKEN_RE, (match, prefix, name, value) => {
  const parsed = parse(value);
  const raw = value.match(OKLCH_RE);

  if (!parsed || !raw) {
    results.malformed.push({ name, value, reason: "unparseable" });
    return match;
  }

  const [, l, c, h] = raw.map(Number);
  if (l < 0 || l > 100) {
    results.malformed.push({
      name,
      value,
      reason: `lightness ${l}% out of [0, 100]`,
    });
    return match;
  }
  if (c < 0 || c > 0.5) {
    results.malformed.push({
      name,
      value,
      reason: `chroma ${c} out of sane range [0, 0.5] — likely typo`,
    });
    return match;
  }
  if (h < 0 || h > 360) {
    results.malformed.push({ name, value, reason: `hue ${h} out of [0, 360]` });
    return match;
  }

  const inSrgb = displayable(parsed);
  const inP3 = displayable({ ...parsed, mode: "p3" });

  if (inSrgb) {
    results.ok.push({ name, value });
    return match;
  }

  const needsFix = target === "srgb" ? !inSrgb : !inP3;
  const clampedColor = clampChroma(
    parsed,
    "oklch",
    target === "srgb" ? "rgb" : "p3",
  );
  const clampedValue = formatOklch(clampedColor);
  const entry = { name, value, clamped: clampedValue };

  if (inP3) results.outOfP3.push(entry);
  else results.outOfSrgb.push(entry);

  if (shouldFix && needsFix) {
    results.fixed.push(entry);
    return `${prefix}${clampedValue}`;
  }
  return match;
});

const pad = (s, n) => s.padEnd(n);
const allEntries = [
  ...results.ok,
  ...results.outOfSrgb,
  ...results.outOfP3,
  ...results.malformed,
];
const longestName = Math.max(...allEntries.map((r) => r.name.length), 0);

if (results.ok.length) {
  console.log("\x1b[32m✓ in sRGB gamut\x1b[0m");
  for (const { name, value } of results.ok) {
    console.log(`  ${pad(name, longestName)}  ${value}`);
  }
}

if (results.outOfP3.length) {
  const fixable = target === "srgb";
  console.log(
    `\n\x1b[33m⚠ in P3 but outside sRGB (will clamp on non-P3 displays)${fixable ? " — fixable with --target=srgb" : ""}\x1b[0m`,
  );
  for (const { name, value, clamped } of results.outOfP3) {
    console.log(`  ${pad(name, longestName)}  ${value}  →  ${clamped}`);
  }
}

if (results.outOfSrgb.length) {
  console.log("\n\x1b[33m⚠ outside P3 (will clamp everywhere)\x1b[0m");
  for (const { name, value, clamped } of results.outOfSrgb) {
    console.log(`  ${pad(name, longestName)}  ${value}  →  ${clamped}`);
  }
}

if (results.malformed.length) {
  console.log("\n\x1b[31m✗ malformed (not auto-fixable)\x1b[0m");
  for (const { name, value, reason } of results.malformed) {
    console.log(`  ${pad(name, longestName)}  ${value}  (${reason})`);
  }
}

if (shouldFix && results.fixed.length) {
  writeFileSync(cssPath, updated);
  console.log(
    `\n\x1b[36m✎ wrote ${results.fixed.length} fix(es) to ${cssPath} (target: ${target})\x1b[0m`,
  );
} else if (shouldFix) {
  console.log(`\n\x1b[36m✎ no fixes needed for target=${target}\x1b[0m`);
}

console.log(
  `\n${results.ok.length} ok · ${results.outOfP3.length} P3-only · ${results.outOfSrgb.length} clamped · ${results.malformed.length} malformed${shouldFix ? ` · ${results.fixed.length} fixed` : ""}`,
);

process.exit(results.malformed.length > 0 ? 1 : 0);
