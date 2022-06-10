const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });
}

function validateToken(token) {
  try{
    return jwt.verify(token, JWT_KEY);//return payload
  }catch (e) {
    return null;//most time because token is out of date.
  }
}
module.exports = { generateToken, validateToken };