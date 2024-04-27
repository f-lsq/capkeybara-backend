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

const generateAccessToken = (id, username, email) => {
  return jwt.sign({
    'id': id,
    'username': username,
    'email': email
  }, process.env.TOKEN_SECRET, {
    expiresIn: "1h"
  })
}

module.exports = {
  getHashedPassword,
  compareHashedPassword,
  generateAccessToken
}