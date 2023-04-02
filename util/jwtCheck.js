const jwtCheck = require('express-jwt');

module.exports = jwtCheck({
  secret: process.env.JWT_SECRET,
});
