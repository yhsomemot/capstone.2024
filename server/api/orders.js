const express = require("express");
const {
    fetchAllOrders
} = require("../db/orders.js")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.send(await fetchAllOrders());
      }
      catch (ex) {
        next(ex);
      }
});
router.get("/user/:id", async (req, res, next) => {
    try {
        res.send(await fetchAllOrders());
      }
      catch (ex) {
        next(ex);
      }
});

// app.get('/api/users/:userId/cartedProducts', async (req, res, next) => {
//     try {
//       res.send(await fetchCartedProducts(req.params.userId));
//     }
//     catch (ex) {
//       next(ex);
//     }
//   });

router.post("/", (req, res) => {
    res.send(`creating a orders with this data: ${JSON.stringify(req.body)}`)
});

router.put("/:id", (req, res) => {
    res.send(`updating a orders with id ${req.params.id} this data: ${JSON.stringify(req.body)}`)
});

router.delete("/:id", (req, res) => {
    res.send(`deleted orders with id ${req.params.id}`)
});

module.exports = router;