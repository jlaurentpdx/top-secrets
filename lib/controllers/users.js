const { Router } = require('express');
const User = require('../services/UserService');
const UserModel = require('../models/User'); // TODO: Delete this line after all tests pass
const pool = require('../utils/pool'); // TODO: Delete this line after all tests pass
const ONE_DAY_IN_MS = 60000 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

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
  });
