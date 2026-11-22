import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The plan: an AI agent sells an AI phone receptionist to small local
// businesses, charging a setup fee plus a monthly retainer. Drafted long,
// then compressed and revised to fit the 1-280 code point gate.
const plan =
  "Sell AI receptionists to dentists/salons with no online booking. " +
  "Day 1: list 200, pitch 50 free trials. " +
  "Bot answers/books/confirms (Twilio+LLM). " +
  "$100: number+credits. " +
  "$149 setup+$99/mo. " +
  "Close 5 by day 30: $1,180 net. " +
  "Retainers recur; rivals sell one-offs, missed calls lose sales.";

// Self-check the gate BEFORE writing anything.
const codePoints = [...plan].length;
if (codePoints < 1 || codePoints > 280) {
  console.error(
    `Gate failed: plan is ${codePoints} code points, must be 1-280.`,
  );
  process.exit(1);
}
if (plan.trim().length === 0) {
  console.error("Gate failed: plan is only whitespace.");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", plan, "utf8");

// Read back what was written and recount: the file on disk must match
// the gated plan exactly, or the run fails loudly.
const written = readFileSync("/output/entry.txt", "utf8");
const writtenCodePoints = [...written].length;
if (written !== plan || writtenCodePoints !== codePoints) {
  console.error(
    `Read-back failed: file has ${writtenCodePoints} code points, ` +
      `expected ${codePoints} and identical text.`,
  );
  process.exit(1);
}
console.log(
  `Wrote /output/entry.txt (${codePoints} code points, read-back verified).`,
);
