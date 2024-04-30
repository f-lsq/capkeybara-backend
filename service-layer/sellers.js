const sellerDataLayer = require('../data-access-layer/sellers')
const { compareHashedPassword } = require('../utils');

async function getAllSellers() {
  const allSellers = await sellerDataLayer.getAllSellers();
  console.log("Service layer:", allSellers);
  return allSellers;
}

async function getSellerBySignupCredentials(buyerUsername, buyerEmail) {
  try {
    const existingUsername = await sellerDataLayer.getBuyerByUsername(buyerUsername)
    const existingEmail = await sellerDataLayer.getBuyerByEmail(buyerEmail)
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
  getSellerBySignupCredentials,
  getSellerByLoginCredentials
}