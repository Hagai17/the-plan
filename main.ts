import { mkdirSync, writeFileSync } from "node:fs";

// The plan: an AI agent sells an AI phone receptionist to small local
// businesses, charging a setup fee plus a monthly retainer. Drafted long,
// then compressed and revised to fit the 1-280 code point gate.
const plan =
  "Sell AI receptionists to dentists/salons on Google Maps, no online booking. " +
  "Day 1: list 200, pitch 50 free trials. " +
  "Bot answers, books, confirms (Twilio+LLM). " +
  "$149 setup+$99/mo. " +
  "Close 5 by day 30: ~$1,180 net. " +
  "Edge: retainers recur; rivals sell one-offs, missed calls cost firms.";

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
console.log(`Wrote /output/entry.txt (${codePoints} code points).`);
