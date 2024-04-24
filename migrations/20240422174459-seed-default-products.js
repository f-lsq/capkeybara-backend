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
  await db.insert("products", ["name", "description", "price", "cost", "quantity", "quantity_sold","category_id"], 
                              ["Keychron K6 Pro Pre-Built", "Compact 65% layout to maximize your work space.", 169.00, 100.00, 4, 15, 1]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity", "quantity_sold","category_id"], 
                              ["Akko V3 Lavender Purple Pro", "Sold in packs of 10 switches (1 qty = 10 switches)", 4.00, 0.70, 28, 7, 2]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity", "quantity_sold","category_id"], 
                              ["Mahjong Keycap Set", "108 keys, Compatible with 60%, TKL and 100% layouts only", 59.00, 20.00, 17, 53, 3]);
  await db.insert("products", ["name", "description", "price", "cost", "quantity", "quantity_sold","category_id"], 
                              ["JWK Screw-In Stabilizers Set", "6x 2u, 1x 6.25, 1x 7u", 22.00, 10.00, 25, 0, 4]);
};

exports.down = function(db) {
  return db.runSqL("DELETE FROM products");
};

exports._meta = {
  "version": 1
};
