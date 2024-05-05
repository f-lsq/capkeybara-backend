const sellerDataLayer = require('../data-access-layer/sellers')
const { compareHashedPassword } = require('../utils');

async function getAllSellers() {
  const allSellers = await sellerDataLayer.getAllSellers();
  return allSellers;
}

/**
 * Checks if sign up information exists in the DB
 * @param {Object} sellerData 
 * @returns 
 */
async function createSeller(sellerData){
  try {
    const existingSeller = await sellerDataLayer.getSellerByEmail(sellerData.email);
    if (!existingSeller) {
      const newSeller = await sellerDataLayer.createSeller(sellerData);
      return newSeller;
    } else {
      return {
        "error": "This email is already in use. Please try again."
      }
    }
  } catch(e) {
    throw new Error(e);
  }
}

async function getSellerById(sellerId) {
  const existingSeller = await sellerDataLayer.getSellerById(sellerId);
  return existingSeller;
}

async function getSellerBySignupCredentials(sellerUsername, sellerEmail) {
  try {
    const existingUsername = await sellerDataLayer.getSellerByUsername(sellerUsername)
    const existingEmail = await sellerDataLayer.getSellerByEmail(sellerEmail)
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
 * @returns {object} seller data, if seller login credentials are valid
 * 'undefined', if seller login credentials are invalid 
 */
async function getSellerByLoginCredentials(email, password){
  try {
    const existingSeller = await sellerDataLayer.getSellerByEmail(email);
    if (existingSeller) {
      const hashedPassword = existingSeller.toJSON().password
      const validPassword = await compareHashedPassword(password, hashedPassword);
      if (validPassword) {
        return existingSeller.toJSON();
      }
    } 
  } catch(e) {
    throw new Error(e);
  }
}


module.exports = {
  getAllSellers,
  createSeller,
  getSellerById,
  getSellerBySignupCredentials,
  getSellerByLoginCredentials
}