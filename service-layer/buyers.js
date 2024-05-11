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

async function getBuyerById(buyerId) {
  const existingBuyer = await buyerDataLayer.getBuyerById(buyerId);
  return existingBuyer;
}

async function getBuyerBySignupCredentials(buyerUsername, buyerEmail) {
  try {
    const existingUsername = await buyerDataLayer.getBuyerByUsername(buyerUsername)
    const existingEmail = await buyerDataLayer.getBuyerByEmail(buyerEmail)
    if (existingUsername && existingEmail) {
      return {
        "error": "Username and Email are already taken"
      }
    } else if (existingUsername) {
      return {
        "error": "Username is already taken"
      }
    } else if (existingEmail) {
      return {
        "error": "Email is already taken"
      }
    }
  } catch(e) {
    throw new Error(e);
  }

}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {object} buyer data, if buyer login credentials are valid
 * 'undefined', if buyer login credentials are invalid 
 */
async function getBuyerByLoginCredentials(email, password){
  try {
    const existingBuyer = await buyerDataLayer.getBuyerByEmail(email);
    if (existingBuyer) {
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
  getBuyerById,
  getBuyerBySignupCredentials,
  getBuyerByLoginCredentials
}