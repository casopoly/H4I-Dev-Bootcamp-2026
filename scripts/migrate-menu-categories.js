const map = {
  Latte: [
    "Cappuccino",
    "Flat White",
    "Caramel Macchiato",
    "Honey Lavender Latte",
    "Dark Chocolate Mocha",
    "Pistachio Latte",
    "Pumpkin Spice Latte",
    "Maple Oat Latte",
    "Iced Vanilla Latte",
    "Iced Mocha",
  ],
  Tea: [
    "Chai Latte",
    "Iced Chai Latte",
    "Matcha",
    "Iced Matcha Latte",
    "Earl Grey Tea",
    "London Fog",
    "Peach Green Tea",
  ],
  Coffee: ["Espresso", "Americano", "Iced Americano", "Cold Brew", "Nitro Cold Brew", "Sweet Cream Cold Brew"],
  Others: [
    "Hot Chocolate",
    "Strawberry Lemonade",
    "Mocha Frappe",
    "Berry Smoothie",
    "Mango Smoothie",
    "Strawberry Acai Refresher",
    "Mango Dragonfruit Refresher",
  ],
};

const items = db.getCollection("menu_items");

for (const [category, names] of Object.entries(map)) {
  const res = items.updateMany({ name: { $in: names } }, { $set: { category } });
  print(`${category}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
}

// Anything still on an old category name after the run
const valid = [...Object.keys(map), "Pastries"];
const leftovers = items.find({ category: { $nin: valid } }, { name: 1, category: 1, _id: 0 }).toArray();
print(leftovers.length ? "Still on an old category:" : "All items are on a valid category.");
leftovers.forEach((i) => print(`  ${i.name} (${i.category})`));
