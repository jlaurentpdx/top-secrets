const { Router } = require('express');
const User = require('../services/UserService');
const pool = require('../utils/pool');

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
      const { email } = req.body;

      const { rows } = await pool.query(
        `
        SELECT
          id, email
        FROM
          users
        WHERE
          email=$1
        `,
        [email]
      );

      if (!rows[0]) return null;

      res.send({ message: 'Signed in successfully', user: rows[0] });
    } catch (error) {
      next(error);
    }
  });
