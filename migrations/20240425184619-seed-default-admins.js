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
                            ["Admin 1", "admin1", "admin1@capkeybara.com", `sIZ+7d8chEFUDz6qQHm5I6oCEML3RKESfttwLq/ZzWk=`]);
  await db.insert("admins", ["name", "username", "email", "password"], 
                            ["Admin 2", "admin2", "admin2@capkeybara.com", `bjh0z7NTANDpinO9F++5KlQz9+U4nr8qnruV5Cq/dQk=`]);
  await db.insert("admins", ["name", "username", "email", "password"], 
                            ["Admin 3", "admin3", "admin3@capkeybara.com", `0gl5hJHZlugXJufJCaYtsXsGvi+RWeOOsClarTWBnBg=`]);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
