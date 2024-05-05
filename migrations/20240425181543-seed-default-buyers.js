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
  await db.insert("buyers", ["username", "email", "password", "first_name", "last_name", "address", "contact", "date_created"], 
                            ["peterpan", "peterpan@neverland.com", "$2b$12$W0xuK6PI7m9IuXcS1JJLruptqHhzmD5IaBer3jPoTnx9PbNslcoP6", "Peter", "Pan", "Neverland", "+1 (206) 342-8631", "2024-05-04 20:00:00"]);
  await db.insert("buyers", ["username", "email", "password", "first_name", "last_name", "address", "contact", "date_created"], 
                            ["tinklebell", "tinkerbell@neverland.com", "$2b$12$dJ18t5GGJFKNnrVEpnS5tOoRIYCDY4LLOSjsNUbTbi335Lkcy8XHS", "Tinkle", "Bell", "Neverland", "+1 (212) 658-3916", "2024-05-04 20:00:00"]);
  await db.insert("buyers", ["username", "email", "password", "first_name", "last_name", "address", "contact", "date_created"], 
                            ["captainhook", "captainhook@neverland.com", "$2b$12$n5m3EvoJ0laium5w.TiYkud8evE86TlsBqU0Ce2HK3.oQxqgxgqMu", "Hook", "Captain", "Neverland", "+1 (201) 874-8593", "2024-05-04 20:00:00"]);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
