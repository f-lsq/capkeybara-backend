const { BlacklistedToken } = require("../models")

async function isBlacklistedToken(refreshToken) {
  try {
    const existingBlacklistedToken = await BlacklistedToken.where({
      token: refreshToken
    }).fetch({
      require: false
    })

    if (existingBlacklistedToken) {
      return true;
    } else {
      return false;
    }
  } catch(e) {
    throw new Error(e)
  }
}

async function createBlacklistedToken(refreshToken) {
  try {
    const blacklistedToken = new BlacklistedToken({
      token: refreshToken,
      date_created: new Date()
    });
    await blacklistedToken.save();
  } catch(e) {
    throw new Error(e);
  }
  
}

module.exports = {
  isBlacklistedToken,
  createBlacklistedToken
}