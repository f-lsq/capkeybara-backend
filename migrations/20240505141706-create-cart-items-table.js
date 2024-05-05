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

exports.up = function(db) {
  return db.createTable('cart_items', {
    id: { type: "int", primaryKey: true, unsigned: true, autoIncrement: true },
    product_id: {type: "int", unsigned: true, notNull: true,
                 foreignKey: {name: 'cart_items_products_fk',
                              table: 'products', 
                              mapping: 'id',
                              rules: {
                                onDelete: "RESTRICT", // could send email to buyers for deleted product (maybe because vendor deleted the product)
                                onUpdate: "RESTRICT"
                              }}},
    buyer_id: {type: "int", unsigned: true, notNull: true,
    foreignKey: {name: 'cart_items_buyers_fk',
                  table: 'buyers', 
                  mapping: 'id',
                  rules: {
                    onDelete: "RESTRICT",
                    onUpdate: "RESTRICT"
                  }}},
    quantity: {type: "int", unsigned: true}
  }
);
};

exports.down = function(db) {
  return db.dropTable('cart_items');
};

exports._meta = {
  "version": 1
};
