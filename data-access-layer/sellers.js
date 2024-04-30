const { Seller } = require("../models");

async function getAllSellers(){
  return await Seller.collection().fetch();
}

module.exports = {
  getAllSellers
}

