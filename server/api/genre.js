const express = require("express");
const { fetchGenre, createGenre } = require('../db/genre.js')


const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
      res.send(await fetchGenre())
    } catch (ex) {
      next(ex)
    }
  })

  //get from single genre
  router.get('/:id', async (req, res, next) => {
    try {
      const SQL = `
        SELECT * from genre WHERE id=$1
      `
      const response = await client.query(SQL[req.params.id])
      res.send(response.rows)
    } catch (ex) {
      next(ex)
    }
  })

  router.post("/", async (req, res, next) => {
    try {
        res.status(201).send(await createGenre(req.body));
      } catch (ex) {
        next(ex);
      }
});

  module.exports = router;