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
  return db.createTable('orders', {
    id: {type: "int", primaryKey: true, autoIncrement: true, unsigned: true}, 
    buyer_id: {type: "int", unsigned: true, notNull: true, foreignKey: {
      name: "order_buyer_fk", table: "buyers", mapping: "id",
      rules: {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT"
      }
    }},
    total: {type: "decimal", precision: 10, scale: 2, unsigned: true, notNull: true},
    order_status: {type: "string", length: 255, notNull: true},
    date_created: {type: "datetime", notNull: true},
    date_fulfilled: {type: "datetime"}
  });
};

exports.down = function(db) {
  return dropTable("orders");
};

exports._meta = {
  "version": 1
};
