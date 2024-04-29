const tokenDataLayer = require("../data-access-layer/tokens");

async function isBlacklistedToken(refreshToken) {
  try {
    const existingBlacklistedToken = tokenDataLayer.isBlacklistedToken(refreshToken);
    return existingBlacklistedToken;
  } catch {
    throw new Error(e);
  }
}

async function createBlacklistedToken(refreshToken) {
  try {
    await tokenDataLayer.createBlacklistedToken(refreshToken);
  } catch {
    throw new Error(e);
  }
}

module.exports = {
  isBlacklistedToken,
  createBlacklistedToken
}