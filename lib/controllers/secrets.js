const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');
const pool = require('../utils/pool');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = await Secret.getAll();
    res.send(secrets);
  } catch (error) {
    next(error);
  }
});
