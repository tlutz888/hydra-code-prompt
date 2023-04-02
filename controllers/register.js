const express = require('express');
const faker = require('faker/locale/en');
const asyncRoute = require('../middleware/asyncRoute');
const jwtGenerate = require('../util/jwtGenerate');
const pwUtil = require('../util/password');
const miscUtils = require('../util/misc');
const routes = express.Router();

routes.post('/', asyncRoute(async (req, res) => {
  const { username, password, email, tagline } = req.body;
  const newUsername = (username || '').trim();
  if (!newUsername || !password)
    req.app.locals.error(400, 'Username and password are required.');
  if (miscUtils.find(res.locals.db.users, 'username', newUsername))
    req.app.locals.error(409, 'Username already taken.');
  const newUser = {
    username: newUsername,
    email: (email || '').trim(),
    tagline: (tagline || '').trim(),
    id: faker.random.uuid(),
    password: (await pwUtil.hash(password)),
  };
  res.locals.db.users.push(newUser);
  const token = jwtGenerate(newUser);
  res.status(201).send({
    ...newUser,
    token,
  });
}));

module.exports = routes;
