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
  await db.insert("buyers", ["username", "email", "password", "first_name", "last_name", "address", "contact", "image_url", "verified", "date_created"], 
                            ["peterpan", "peterpan@neverland.com", "$2b$12$W0xuK6PI7m9IuXcS1JJLruptqHhzmD5IaBer3jPoTnx9PbNslcoP6", "Peter", "Pan", "Neverland", "+1 (206) 342-8631", "https://res.cloudinary.com/dkgnjflxq/image/upload/v1715442029/Capkeybara/you5vlmsph9qts7rmwom.webp", true, "2024-05-04 20:00:00"]);
  await db.insert("buyers", ["username", "email", "password", "first_name", "last_name", "address", "contact", "image_url", "verified", "date_created"], 
                            ["tinklebell", "tinkerbell@neverland.com", "$2b$12$dJ18t5GGJFKNnrVEpnS5tOoRIYCDY4LLOSjsNUbTbi335Lkcy8XHS", "Tinkle", "Bell", "Neverland", "+1 (212) 658-3916", "https://res.cloudinary.com/dkgnjflxq/image/upload/v1715439789/Capkeybara/ywnaii2o4fstdhaiiyia.webp", true, "2024-05-04 20:00:00"]);
  await db.insert("buyers", ["username", "email", "password", "first_name", "last_name", "address", "contact", "image_url", "verified", "date_created"], 
                            ["captainhook", "captainhook@neverland.com", "$2b$12$n5m3EvoJ0laium5w.TiYkud8evE86TlsBqU0Ce2HK3.oQxqgxgqMu", "Hook", "Captain", "Neverland", "+1 (201) 874-8593", "https://res.cloudinary.com/dkgnjflxq/image/upload/v1715439789/Capkeybara/gmsb6bozjfecoozhzxal.webp", true, "2024-05-04 20:00:00"]);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
