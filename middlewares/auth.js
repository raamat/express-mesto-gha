const JWT = require('jsonwebtoken');

const SECRET_KEY = 'Secret#2023%';

function generateToken(payload) {
  return JWT.sign(payload, SECRET_KEY);
}

module.exports = { generateToken };
