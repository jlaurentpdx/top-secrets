const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');
const pool = require('../utils/pool');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.send(secrets);
    } catch (error) {
      next(error);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { rows } = await pool.query(
        `
      INSERT INTO
        secrets (title, description)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
        [title, description]
      );

      res.send({
        secret: {
          id: rows[0].id,
          title: rows[0].title,
          description: rows[0].description,
          createdAt: rows[0].created_at,
        },
        message: 'Secret successfully added.',
      });
    } catch (error) {
      next(error);
    }
  });
