const bcrypt = require('bcrypt');

const callHash = (fn, password) => {
  return fn.call(
    null,
    password,
    +process.env.BCRYPT_ROUNDS || 10,
  );
};

// Using synchronous bcrypt methods for simplicity in dev
module.exports = {
  hash: (password) => {
    return callHash(bcrypt.hash, password);
  },
  hashSync: (password) => {
    return callHash(bcrypt.hashSync, password);
  },
  check: (password, hash) => {
    return bcrypt.compare(
      password,
      hash,
    );
  },
};
