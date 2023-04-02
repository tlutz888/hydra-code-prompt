require('dotenv').config();

const fs = require('fs');
const faker = require('faker/locale/en');

const seed = process.env.RANDOM_SEED;
if (seed) {
  console.log(`Generating sample data using random seed: ${seed}`);
  faker.seed(+seed);
} else {
  console.log(`Generating sample data`);
}

const users = require('./users')(faker);
fs.writeFileSync(
  `${process.env.NODE_PATH}/data/users.json`,
  JSON.stringify(users, null, 2),
);

const userIDs = users.map((user) => { return user.id });
const objects = require('./objects')(faker, userIDs);
fs.writeFileSync(
  `${process.env.NODE_PATH}/data/objects.json`,
  JSON.stringify(objects, null, 2),
);
