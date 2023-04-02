const express = require('express');
const asyncRoute = require('../middleware/asyncRoute');
const pwUtil = require('../util/password');
const paginate = require('../util/paginate');
const miscUtils = require('../util/misc');
const routes = express.Router();

const renderUser = (user) => {
  const { username, tagline } = user;
  return { username, tagline };
};

routes.param('username', (req, res, next, username) => {
  const user = miscUtils.find(res.locals.db.users, 'username', username);
  if (!user)
    req.app.locals.error(404, 'User not found.');
  req.user = user;
  req.isSelf = (req.user.id === req.currentUser.id);
  next();
});

routes.get('/', (req, res) => {
  let users;
  try {
    users = paginate(res.locals.db.users, req.query);
  } catch (err) {
    req.app.locals.error(400, err.message);
  }
  users.page = users.page.map(renderUser);
  res.send(users);
});

routes.get('/:username', (req, res) => {
  res.send(
    req.isSelf ? req.user : renderUser(req.user),
  );
});

routes.patch('/:username', asyncRoute(async (req, res) => {
  if (!req.isSelf)
    req.app.locals.error(403, 'Cannot update other users.');
  const updateKeys = [
    'tagline', 'email',
  ];
  Object.assign(req.user, miscUtils.getKeys(req.body, updateKeys));
  if (req.body.password) {
    const passwordHash = await pwUtil.hash(req.body.password);
    Object.assign(req.user, { password: passwordHash });
  }
  res.send(req.user);
}));

module.exports = routes;
