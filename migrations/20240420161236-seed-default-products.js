'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["The Bee With T&I XANADU X100", "1800 Compact Layout Wired & Wireless Hot Swappable Gasket-mounted Mechanical Keyboard", 119.99, 80.00, 34, 23, 1, 1,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["CIDOO V68 VIA", "Alice Layout VIA Programmable Gasket Hot-swappable Mechanical Keyboard with TFT Screen", 129.99, 70.00, 12, 3, 1, 1,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["AULA S99 Gasket mechanical keyboard", "Features a compact 99-key layout, providing a space-efficient design while retaining a full numeric keypad", 49.99, 19.99, 23, 4, 1, 2,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created","date_modified"], 
                              ["AULA S98 Gasket mechanical keyboard", "Features a compact 98-key layout, providing a space-efficient design while retaining a full numeric keypad", 96.99, 49.00, 5, 0, 1, 2,"2024-05-04 20:00:00","2024-05-05 09:34:00"])
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["AULA F21 Mechanical Numeric keyboard", "Enhance your computing experience with the AULA F21 Bluetooth Wireless Mechanical Numeric Keypad. Crafted with precision engineering and ergonomic design, this keypad is tailored for both work and play, offering seamless connectivity and exceptional performance.", 85.00, 34.00, 34, 12, 1, 2,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created","date_modified"], 
                              ["AULA F68 GASKET 3 in 1 Hot Swappable Mechanical Gaming transparent Keyboard-Purple", "Compatible with destop computer, notebook, tablet, all-in-one computer, mobile phone and other devices", 119.00, 100.00, 10, 24, 1, 2,"2024-05-04 20:00:00","2024-05-05 09:34:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["Keychron K6 Pro Pre-Built", "Compact 65% layout to maximize your work space.", 169.00, 100.00, 4, 15, 1, 3,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["Haimu Sea Salt Linear Switch", "Each Haimu Sea Salt Linear Switch Set comes with 110 switches and the bottle.", 19.00, 8.00, 34, 34, 2, 3,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["EPOMAKER Sky Blue Keycaps Set", "133 Keys Cherry Profile Side-printed Double Shot PBT Full Keycaps Set", 24.99, 10.00, 28, 7, 3, 1,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["Keychron Klube Lubricant", "Lubricant for switches and stabilizers", 5.00, 0.7, 234, 107, 4, 3,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["Keychron Gold Plated PCB Mounted Stabilizer Set", "Each Keychron Gold Plated PCB Mounted Stabilizer Set includes 8pcs of stabilizers (2u), 1pcs of stabilizer (6.25u), 1pcs of stabilizer (7u) and a bag of screws. ", 10.00, 1.80, 56, 14, 4, 3,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold","category_id","seller_id","date_created"], 
                              ["KiiBOOM Transparent Acrylic Wrist Rest", "Transparent Wrist Rest for Mechanical Keyboard", 19.99, 3.00, 123, 23, 4, 1,"2024-05-04 20:00:00"]);
};

exports.down = function(db) {
  return db.runSqL("DELETE FROM products");
};

exports._meta = {
  "version": 1
};
