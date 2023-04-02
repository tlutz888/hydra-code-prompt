let data;

try {
  data = {
    users: require('./data/users'),
    objects: require('./data/objects'),
  };
} catch (err) {
  console.log('Seed data missing; run `npm run seed` to generate data.');
  process.exit(1);
}

module.exports = {
  data,
};
