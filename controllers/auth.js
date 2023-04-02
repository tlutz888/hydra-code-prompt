const express = require('express');
const asyncRoute = require('../middleware/asyncRoute');
const jwtGenerate = require('../util/jwtGenerate');
const pwUtil = require('../util/password');
const miscUtils = require('../util/misc');
const routes = express.Router();

routes.post('/', asyncRoute(async (req, res) => {
  const { username, password } = req.body;
  const user = miscUtils.find(res.locals.db.users, 'username', username);
  if (!user)
    req.app.locals.error(403, 'User not found.');
  if (!user.password)
    req.app.locals.error(403, 'User has no password set.');
  if (!(await pwUtil.check(password, user.password)))
    req.app.locals.error(403, 'Incorrect password.');
  const token = jwtGenerate(user);
  res.send({ token });
}));

module.exports = routes;
