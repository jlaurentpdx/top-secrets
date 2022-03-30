const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const pool = require('../utils/pool');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        secrets
      `
    );
    res.send(rows);
  } catch (error) {
    next(error);
  }
});
