const buyerDataLayer = require('../data-access-layer/buyers');
const { compareHashedPassword } = require('../utils');

async function getAllBuyers(){
  const allBuyers = await buyerDataLayer.getAllBuyers()
  return allBuyers;
}

/**
 * Checks if sign up information exists in the DB
 * @param {Object} buyerData 
 * @returns 
 */
async function createBuyer(buyerData){
  try {
    const existingBuyer = await buyerDataLayer.getBuyerByEmail(buyerData.email);
    console.log(existingBuyer.toJSON());
    if (!existingBuyer) {
      const newBuyer = await buyerDataLayer.createBuyer(buyerData);
      return newBuyer;
    } else {
      return {
        "error": "This email is already in use. Please try again."
      }
    }
  } catch(e) {
    throw new Error(e);
  }
}

async function getBuyerByLoginCredentials(email, password){
  try {
    const existingBuyer = await buyerDataLayer.getBuyerByEmail(email);
    
    if (!existingBuyer) {
      return {
        "Error": "Invalid login credentials."
      }
    } else {
      const hashedPassword = existingBuyer.toJSON().password
      const validPassword = await compareHashedPassword(password, hashedPassword);
      if (validPassword) {
        return existingBuyer.toJSON();
      }
    }
  } catch(e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllBuyers,
  createBuyer,
  getBuyerByLoginCredentials
}