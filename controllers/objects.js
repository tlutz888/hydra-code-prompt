const express = require('express');
const faker = require('faker');
const paginate = require('../util/paginate');
const miscUtils = require('../util/misc');
const routes = express.Router();

const editableKeys = [
  'item', 'material', 'description',
];

const renderObject = (obj) => {
  const { owner, ...rest } = obj;
  return { ...rest };
};

////////////////////////////////////////////////////////////////////////////////
// Listings

const paginateObjects = (req, res) => {
  try {
    res.send(paginate(res.objects, req.query));
  } catch (err) {
    req.app.locals.error(400, err.message);
  }
};

routes.get('/', (req, res, next) => {
  res.objects = res.locals.db.objects.map(renderObject);
  next();
}, paginateObjects);

routes.get('/mine', (req, res, next) => {
  res.objects = res.locals.db.objects.filter(
    (obj) => { return obj.owner === req.currentUser.id },
  ).map(renderObject);
  next();
}, paginateObjects);

routes.get('/for/:username', (req, res, next) => {
  const user = miscUtils.find(
    res.locals.db.users,
    'username',
    req.params.username,
  );
  if (!user)
    req.app.locals.error(404, 'User not found.');
  res.objects = res.locals.db.objects.filter(
    (obj) => { return obj.owner === user.id },
  ).map(renderObject);
  next();
}, paginateObjects);

////////////////////////////////////////////////////////////////////////////////
// Individual objects

routes.post('/', (req, res) => {
  const newObject = {
    ...miscUtils.getKeys(req.body, editableKeys),
    id: faker.random.uuid(),
    owner: req.currentUser.id,
  };
  res.locals.db.objects.push(newObject);
  res.status(201).send(renderObject(newObject));
});

routes.param('objectID', (req, res, next, objectID) => {
  const object = miscUtils.find(res.locals.db.objects, 'id', objectID);
  if (!object)
    req.app.locals.error(404, 'Object not found.');
  req.object = object;
  next();
});

const verifyOwnership = (req, res, next) => {
  if (req.object.owner !== req.currentUser.id)
    req.app.locals.error(403, 'Cannot modify other users’ objects.');
  next();
}

routes.get('/:objectID', (req, res) => {
  res.send(renderObject(req.object));
});

routes.put('/:objectID', verifyOwnership, (req, res) => {
  const newObject = {
    ...miscUtils.getKeys(req.body, editableKeys),
    id: req.object.id,
    owner: req.object.owner,
  };
  res.locals.db.objects = res.locals.db.objects.map(
    (obj) => { return (obj.id === newObject.id) ? newObject : obj },
  );
  res.send(renderObject(newObject));
});

routes.patch('/:objectID', verifyOwnership, (req, res) => {
  Object.assign(req.object, miscUtils.getKeys(req.body, editableKeys));
  res.send(renderObject(req.object));
});

routes.delete('/:objectID', verifyOwnership, (req, res) => {
  res.locals.db.objects = res.locals.db.objects.filter(
    (obj) => { return obj.id !== req.object.id },
  );
  res.status(204).send();
});

module.exports = routes;
