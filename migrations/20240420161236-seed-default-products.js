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
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["The Bee With T&I XANADU X100", "1800 Compact Layout Wired & Wireless Hot Swappable Gasket-mounted Mechanical Keyboard", 119.99, 80.00, 34, 23, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907006/Capkeybara/uyicccbh64ht8ucvozsz.webp", 1, 1,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["CIDOO V68 VIA", "Alice Layout VIA Programmable Gasket Hot-swappable Mechanical Keyboard with TFT Screen", 129.99, 70.00, 12, 3, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907005/Capkeybara/jyf34pcgmkkv3gtziinx.webp", 1, 1,"2024-05-05 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["AULA S99 Gasket mechanical keyboard", "Features a compact 99-key layout, providing a space-efficient design while retaining a full numeric keypad", 49.99, 19.99, 23, 4, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714906999/Capkeybara/eeymcdyixou0sntvvlmd.webp", 1, 2,"2024-05-05 21:34:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created","date_modified"], 
                              ["AULA S98 Gasket mechanical keyboard", "Features a compact 98-key layout, providing a space-efficient design while retaining a full numeric keypad", 96.99, 49.00, 5, 0, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714906999/Capkeybara/uy5sunurgdsyfdai5hnx.webp", 1, 2,"2024-04-04 20:30:40","2024-05-05 09:34:00"])
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["AULA F21 Mechanical Numeric keyboard", "Enhance your computing experience with the AULA F21 Bluetooth Wireless Mechanical Numeric Keypad. Crafted with precision engineering and ergonomic design, this keypad is tailored for both work and play, offering seamless connectivity and exceptional performance.", 85.00, 34.00, 34, 12, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714906999/Capkeybara/cgxpjalhwisblycebbyi.webp", 1, 2,"2024-05-12 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created","date_modified"], 
                              ["AULA F68 GASKET 3 in 1 Hot Swappable Mechanical Gaming transparent Keyboard-Purple", "Compatible with destop computer, notebook, tablet, all-in-one computer, mobile phone and other devices", 119.00, 100.00, 10, 24, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907000/Capkeybara/y9ewax7pd1naob5nwu3r.webp", 1, 2,"2024-05-04 20:00:00","2024-03-05 09:34:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["Keychron K6 Pro Pre-Built", "Compact 65% layout to maximize your work space.", 169.00, 100.00, 4, 15, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907011/Capkeybara/hppqgkxm5bbayymrpeqz.webp", 1, 3,"2024-02-02 20:00:00"]);
                              await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["EPOMAKER x AULA F75", "75% Gasket Wireless Mechanical Keyboard", 69.99, 30.00, 123, 35, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1715937386/Capkeybara/smkg2tfi9ri6aczu4eyk.webp", 1, 1,"2024-05-03 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["Haimu Sea Salt Linear Switch", "Each Haimu Sea Salt Linear Switch Set comes with 110 switches and the bottle.", 19.00, 8.00, 34, 34, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1715839809/Capkeybara/vwiu5fh9bd5vuqzdngmk.webp", 2, 3,"2024-04-23 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["Macha Keycaps", "109 Keys Suspended Low Keycap with Curved Layout", 95.00, 60.00, 1, 1, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714975485/Capkeybara/pmw6oywwnsgemsntnt5s.webp", 3, 1,"2024-05-04 20:00:00"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["EPOMAKER Sky Blue Keycaps Set", "133 Keys Cherry Profile Side-printed Double Shot PBT Full Keycaps Set", 24.99, 10.00, 28, 7, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907005/Capkeybara/h239kh1rhgihobb9fi2h.webp", 3, 1,"2024-05-12 12:34:56"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["Keychron Klube Lubricant", "Lubricant for switches and stabilizers", 5.00, 0.7, 234, 107, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1715839809/Capkeybara/rtpbcbzzrws0aydjlztx.webp", 4, 3,"2024-01-02 03:04:05"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["Keychron Gold Plated PCB Mounted Stabilizer Set", "Each Keychron Gold Plated PCB Mounted Stabilizer Set includes 8pcs of stabilizers (2u), 1pcs of stabilizer (6.25u), 1pcs of stabilizer (7u) and a bag of screws. ", 10.00, 1.80, 56, 14, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907010/Capkeybara/bjb30lgqw8kie4g3l2h5.webp", 4, 3,"2024-02-14 07:07:07"]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity_available", "quantity_sold", "image_url","category_id","seller_id","date_created"], 
                              ["KiiBOOM Transparent Acrylic Wrist Rest", "Transparent Wrist Rest for Mechanical Keyboard", 19.99, 3.00, 123, 23, "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714907004/Capkeybara/gsfhbqyfefarspnec0zz.webp", 4, 1,"2023-04-05 16:17:18"]);
};

exports.down = function(db) {
  return db.runSqL("DELETE FROM products");
};

exports._meta = {
  "version": 1
};
