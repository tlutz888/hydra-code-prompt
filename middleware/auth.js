const jwtCheck = require('express-jwt');

module.exports = {
  jwtCheck: jwtCheck({
    secret: process.env.JWT_SECRET,
  }),
  userLookup: (req, res, next) => {
    const user = res.locals.db.users.find(u => u.id === req.user.id);
    if (!user)
      req.app.locals.error(401, 'User not found');
    req.currentUser = user;
    next();
  },
};
