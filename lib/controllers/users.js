const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../services/UserService');
const UserModel = require('../models/User'); // TODO: Delete this line after all tests pass
const pool = require('../utils/pool'); // TODO: Delete this line after all tests pass
const ONE_DAY_IN_MS = 60000 * 24;

module.exports = Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const user = await User.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .send({ message: 'Signed in successfully', user });
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', authenticate, async (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME)
        .send({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  });
