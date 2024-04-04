const express = require("express");
const { fetchGenre, createGenre, fetchSingleGenre } = require('../db/genre.js')


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
      res.send(await fetchSingleGenre({id: req.params.id}))
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