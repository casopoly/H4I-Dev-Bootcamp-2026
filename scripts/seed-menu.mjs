// Adds the menu items in data/menu-seed.json to MongoDB, and updates the ones that already exist (matched by name).
//
//   node scripts/seed-menu.mjs           dry run: prints what would change, writes nothing
//   node scripts/seed-menu.mjs --apply   writes the changes
//
// Reads MONGO_URI from .env.local (it must end in /team14). Back up first:
//   mongoexport --uri "$MONGO_URI" --collection menu_items --out menu_items_backup.json
import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

const apply = process.argv.includes("--apply");
const root = process.cwd();

const seed = JSON.parse(fs.readFileSync(path.join(root, "data/menu-seed.json"), "utf8"));
const uri = fs
  .readFileSync(path.join(root, ".env.local"), "utf8")
  .match(/^MONGO_URI=(.*)$/m)?.[1]
  ?.replace(/^["']|["']$/g, "");
if (!uri) throw new Error("MONGO_URI not found in .env.local");

// Check the data before touching the database
const problems = [];
const names = new Set();
for (const item of seed) {
  if (names.has(item.name)) problems.push(`${item.name}: duplicate name`);
  names.add(item.name);
  if (!fs.existsSync(path.join(root, "public", item.image)))
    problems.push(`${item.name}: missing file public${item.image}`);
  if (!["Hot Drinks", "Cold Drinks", "Pastries"].includes(item.category)) problems.push(`${item.name}: bad category`);
  const sizes = item.sizes.map((s) => s.size);
  if (sizes.length < 1 || sizes.length > 3 || new Set(sizes).size !== sizes.length)
    problems.push(`${item.name}: bad sizes`);
  if (item.sizes.some((s) => !(s.price >= 0))) problems.push(`${item.name}: bad price`);
}
if (problems.length) {
  console.error("Not touching the database:\n- " + problems.join("\n- "));
  process.exit(1);
}

// Waits up to 30 seconds: from some networks (WSL) Atlas takes longer than the 5 seconds the app allows
await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
const items = mongoose.connection.db.collection("menu_items");
console.log(`${apply ? "APPLY" : "DRY RUN"} on database "${mongoose.connection.name}"`);
console.log(`menu_items has ${await items.countDocuments()} documents; the seed has ${seed.length} items\n`);

let added = 0;
let updated = 0;
let same = 0;
for (const item of seed) {
  const found = await items.find({ name: item.name }).toArray();
  if (found.length > 1) {
    console.log(`SKIP    ${item.name}: ${found.length} documents have this name, fix by hand`);
    continue;
  }
  if (found.length === 0) {
    console.log(`ADD     ${item.name}`);
    if (apply) await items.insertOne(item);
    added++;
    continue;
  }
  const { _id, ...current } = found[0];
  // Compare field by field, so the order of the fields in the document doesn't matter
  const changed = Object.keys(item).filter((key) => JSON.stringify(current[key]) !== JSON.stringify(item[key]));
  if (changed.length === 0) {
    same++;
    continue;
  }
  console.log(`UPDATE  ${item.name}: ${changed.join(", ")}`);
  if (apply) await items.updateOne({ _id }, { $set: item });
  updated++;
}

const notInSeed = (await items.find({ name: { $nin: seed.map((s) => s.name) } }).toArray()).map((d) => d.name);
console.log(`\n${added} to add, ${updated} to update, ${same} already up to date`);
if (notInSeed.length) console.log(`In the database but not in the seed (left alone): ${notInSeed.join(", ")}`);
if (!apply) console.log("Dry run only. Add --apply to write.");
await mongoose.disconnect();
