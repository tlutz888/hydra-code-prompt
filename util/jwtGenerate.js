const jwtSign = require('jsonwebtoken');

module.exports = (user) => {
  const payload = { id: user.id };
  return jwtSign.sign(payload, process.env.JWT_SECRET, {
    expiresIn: (process.env.JWT_DURATION || '24h'),
  });
};
