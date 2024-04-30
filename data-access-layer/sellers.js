const { Seller } = require("../models");

async function getAllSellers(){
  return await Seller.collection().fetch();
}

async function getSellerByUsername(sellerUsername) {
  try {
    const existingSeller = await Seller.where({
      username: sellerUsername
    }).fetch({
      require: false
    })
    return existingSeller;
  } catch (e) {
    throw new Error(e)
  }
}

async function getSellerByEmail(sellerEmail){
  try {
    const existingSeller = await Seller.where({
      email: sellerEmail
    }).fetch({
      require: false
    })

    return existingSeller;
  } catch(e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllSellers,
  getSellerByUsername,
  getSellerByEmail
}

