// FOR DDL (Creating tables), NOT DML (Manipulating tables) 

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

// Changes to be made to the db when running `npm run migrate up`
exports.up = function(db) {
  return db.createTable('products', {
    id: {type: "int", primaryKey: true, autoIncrement: true, unsigned: true}, 
    name: {type: "string", length: 255, notNull: true},
    description : {type: "text"},
    price: {type: "decimal", precision: 10, scale: 2, unsigned: true},
    cost: {type: "decimal", precision: 10, scale: 2, unsigned: true, notNull: true},
    quantity: {type: "int", unsigned: true, notNull: true},
    quantity_sold: {type: "int", unsigned: true, notNull: true, defaultValue: 0},
    image_url: {type: "string", length: 255},
    category_id: {type: "int", unsigned: true, notNull: true}
  });
};

// Reverts changes made to the db when running `npm run migrate down`
exports.down = function(db) {
  return db.dropTable("products");
};

exports._meta = {
  "version": 1
};
