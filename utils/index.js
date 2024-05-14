const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Hash password using blowfish
const getHashedPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  return hashedPassword;
}

const compareHashedPassword = async (plainPassword, hashedPassword) => {
  const validPassword = await bcrypt.compare(plainPassword, hashedPassword);
  return validPassword;
  
}

/**
 * 
 * @param {Object} data 
 * @param {*} secret 
 * @param {*} expiresIn 
 * @returns 
 */
const generateAccessToken = (data, secret, expiresIn, role) => {
  if (role === "buyer") {
    return jwt.sign({
      'id': data.id,
      'first_name': data.first_name,
      'username': data.username,
      'email': data.email,
      'role': role
    }, secret, {
      expiresIn
    })
  }

  if (role === "seller") {
    return jwt.sign({
      'id': data.id,
      'name': data.name,
      'username': data.username,
      'email': data.email,
      'role': role
    }, secret, {
      expiresIn
    })
  }
}

module.exports = {
  getHashedPassword,
  compareHashedPassword,
  generateAccessToken
}