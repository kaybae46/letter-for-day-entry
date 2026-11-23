// One Letter for Your Day — main.ts
// Entry: a single letter, A-Z, standing for the word that describes the day.
// The letter is N: "no sleep".
//
// Why N: today, Tuesday 24 November 2026, was worked straight through the
// night — bounty builds, hourly Interstellar cache claims (00:12, 02:16,
// 04:17 WIB) and a make.fun screening sweep every five minutes, with no
// sleep in between. "No sleep" is the truest, most vivid word for the day,
// and N is its first letter: short, blunt, and instantly readable as the
// night-shift diary entry it is.
//
// The letter is fixed, not computed from the date: the final phase re-runs
// this program after the deadline, and the entry must still be N then.
//
// The gate requires /output/entry.txt to be UTF-8 text of exactly one
// character, not only white space. So the program writes one byte, "N",
// with no trailing newline, then reads the file back and refuses to exit
// cleanly unless it holds exactly one ASCII letter.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LETTER = "N";
const ENTRY_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(ENTRY_PATH, LETTER, "utf8");

// Verify the gate condition: exactly one character, A-Z, nothing else.
const written = readFileSync(ENTRY_PATH, "utf8");
if (written.length !== 1 || !/^[A-Z]$/.test(written)) {
  console.error(
    `invalid entry: expected exactly one letter A-Z, got ${JSON.stringify(written)}`,
  );
  process.exit(1);
}
console.log(`wrote entry: ${written}`);
