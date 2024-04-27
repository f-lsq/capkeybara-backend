const { Buyer } = require("../models");

async function getAllBuyers(){
  return await Buyer.collection().fetch();
}

async function createBuyer(buyerData){
  try {
    const newBuyer = new Buyer({
      ...buyerData,
      date_created: new Date()
    })
    await newBuyer.save();
    return newBuyer;
  } catch(e) {
    throw new Error(e);
  }
  
}

async function getBuyerByEmail(buyerEmail){
  try {
    const existingBuyer = await Buyer.where({
      email: buyerEmail
    }).fetch({
      require: false
    })
    
    return existingBuyer;
  } catch(e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllBuyers,
  createBuyer,
  getBuyerByEmail
}