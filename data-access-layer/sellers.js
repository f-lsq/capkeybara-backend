const { Seller } = require("../models");

async function getAllSellers(){
  return await Seller.collection().fetch();
}

async function createSeller(sellerData){
  try {
    const newSeller = new Seller({
      ...sellerData,
      date_created: new Date()
    })
    await newSeller.save();
    return newSeller;
  } catch(e) {
    throw new Error(e);
  }
}

async function getSellerById(sellerId) {
  try {
    const existingSeller = await Seller.where({
      id: sellerId
    }).fetch({
      require: false
    })
    return existingSeller;
  } catch (e) {
    throw new Error(e)
  }
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
  createSeller,
  getSellerById,
  getSellerByUsername,
  getSellerByEmail
}

