const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query(
      `
        INSERT INTO
          users (email, password)
        VALUES
          ($1, $2)
        RETURNING 
          id, email
      `,
      [email, password]
    );

    res.send(rows[0]);
  } catch (error) {
    next(error);
  }
});
