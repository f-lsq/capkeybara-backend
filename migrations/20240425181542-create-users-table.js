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
  return db.createTable("users", {
    id: {type: "int", primaryKey: true, autoIncrement: true, unsigned: true},
    username: {type: "string", length: 100, notNull: true},
    email: {type: "string", length: 320, notNull: true},
    password: {type: "string", length: 80, notNull: true},
    first_name: {type: "string", length: 255, notNull: true},
    last_name: {type: "string", length: 255, notNull: true},
    address: {type: "string", length: 255, notNull: true},
    contact: {type: "string", length: 20, notNull: true},
    verified: {type: "boolean", notNull: true, defaultValue: false},
    date_created: {type: "datetime", notNull: true},
  });
};

exports.down = function(db) {
  return db.dropTable("users");
};

exports._meta = {
  "version": 1
};
