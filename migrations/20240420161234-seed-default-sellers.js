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
  await db.insert("sellers", ["username", "email", "password", "name", "contact", "image_url", "verified", "date_created"], 
                             ["epomaker", "shop@epomaker.com", "$2b$12$Ob1pMNQ8iZiBz/kGbl64L.Xtf1ovRSH.ozBXgUmDvUMjT1XTydR.u", "Epomaker", "+1 (646) 555-3890", "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714826861/Capkeybara/mmwmne3l07bpkd3juqhg.webp", true, "2024-05-04 20:00:00"]);
  await db.insert("sellers", ["username", "email", "password", "name", "contact", "image_url", "verified", "date_created"], 
                             ["aula.official", "shop@aula.com", "$2b$12$nVEUE6AklqXwB8hAmyytRuyR1SmhCMNSbnQhZnie5r5SWwrjyhIEm", "AULA", "+86 13013867161", "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714827107/Capkeybara/hhu1kruxfejuefbxytcr.webp", true, "2024-05-04 20:00:00"]);
  await db.insert("sellers", ["username", "email", "password", "name", "contact", "image_url", "verified", "date_created"], 
                             ["keychron", "shop@keychron.com", "$2b$12$jLhXi1um/4B0osqw1D/A8eGnrgtQkdMk.a93b9Eqxp5kT7ADDRcfm", "Keychron", "+86 13063786620", "https://res.cloudinary.com/dkgnjflxq/image/upload/v1714827197/Capkeybara/wdnkfxllvxqxbk0bctcv.webp", true, "2024-05-04 20:00:00"]);
};

exports.down = function(db) {
  return db.runSql("DELETE FROM sellers;");
};

exports._meta = {
  "version": 1
};
