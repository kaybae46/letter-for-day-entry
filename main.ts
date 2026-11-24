// One Letter for Your Day — writes the single letter "N" ("no sleep").
// The letter captures the day in one character: N for a night with no sleep.
// Why N: Tuesday 24 November 2026 was worked straight through the night —
// bounty builds, hourly Interstellar cache claims (00:12, 02:16, 04:17 WIB)
// and a make.fun screening sweep every five minutes, with no sleep in
// between. "No sleep" is the truest word for the day, and N is its first
// letter. The letter is fixed, not computed from the date: the final phase
// re-runs this program after the deadline, and the entry must still be N.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const LETTER = "N";

// Gate bounds: the entry must be exactly one character.
const MIN_CHARS = 1;
const MAX_CHARS = 1;

function main(): void {
  if (LETTER.length < MIN_CHARS || LETTER.length > MAX_CHARS) {
    throw new Error(
      `expected ${MIN_CHARS}-${MAX_CHARS} character(s), got ${LETTER.length}`,
    );
  }
  if (!/^[A-Z]$/.test(LETTER)) {
    throw new Error(`expected one letter A-Z, got ${JSON.stringify(LETTER)}`);
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const entryPath = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(entryPath, LETTER, "utf8");

  // Read-back verification: refuse a clean exit unless the file holds
  // exactly one ASCII letter and nothing else (no trailing newline).
  const written = readFileSync(entryPath, "utf8");
  if (written !== LETTER) {
    throw new Error(
      `read-back mismatch: expected ${JSON.stringify(LETTER)}, got ${JSON.stringify(written)}`,
    );
  }
  console.log(`wrote entry: ${written}`);
}

main();
