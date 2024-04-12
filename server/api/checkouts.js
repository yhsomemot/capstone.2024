const express = require("express");
const {

} =require ("../db/checkouts.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: api/checkout

router.delete("/checkout", isLoggedIn, async (req, res, next) => {
    try {
      res.status(204).send(await checkout(req.user.id))
    } catch (ex) {
      next(ex);
    }
  })

module.exports = router;