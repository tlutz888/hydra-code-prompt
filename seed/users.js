const pwUtil = require('../util/password');

// Give all seed users the super-secure password "password"
const dummyPassword = pwUtil.hashSync('password');

module.exports = (faker) => {
  return [...Array(+process.env.USER_COUNT || 10)].reduce((memo) => {
    memo.push({
      id: faker.random.uuid(),
      username: faker.internet.userName(),
      password: dummyPassword,
      email: faker.internet.email(),
      tagline: faker.lorem.sentence(),
    });
    return memo;
  }, []).sort(
    (a, b) => a.id.localeCompare(b.id),
  );
};
