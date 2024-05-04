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
  return db.createTable("sellers", {
    id: {type: "int", primaryKey: true, autoIncrement: true, unsigned: true},
    username: {type: "string", length: 100, notNull: true},
    email: {type: "string", length: 320, notNull: true},
    password: {type: "string", length: 80, notNull: true},
    name: {type: "string", length: 255, notNull: true},
    contact: {type: "string", length: 20, notNull: true},
    image_url: {type: "string", length: 255},
    verified: {type: "boolean", notNull: true, defaultValue: false},
    date_created: {type: "datetime", notNull: true}
  });
};

exports.down = function(db) {
  return db.dropTable("sellers");
};

exports._meta = {
  "version": 1
};

// INSERT INTO sellers (username, email, password, name, contact, date_created) VALUES ("TestSeller", "testseller@gmail.com", "TestSellerPassword", "Test Seller", "12345678", "2008-11-11 11:12:01");