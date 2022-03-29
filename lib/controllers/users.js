const { Router } = require('express');
const User = require('../services/UserService');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
