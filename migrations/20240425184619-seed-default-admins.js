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
  await db.insert("admins", ["name", "username", "email", "password"], 
                            ["Admin 1", "admin1", "admin1@capkeybara.com", "3foI8E/77dk3zgeQJurZgmwPRXL+7l5F/ypm0FjAydU="]);
  await db.insert("admins", ["name", "username", "email", "password"], 
                            ["Admin 2", "admin2", "admin2@capkeybara.com", "vF2HpsSXmlHNQvGY2Wf6L/mlbmY/EkPhPNr8qGY/8fE="]);
  await db.insert("admins", ["name", "username", "email", "password"], 
                            ["Admin 3", "admin3", "admin3@capkeybara.com", "eBPnLbYHSMySd8igRaokko\SKIT9fOu8bWUjShnOsTY="]);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
