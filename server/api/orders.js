const express = require("express");
const {
    fetchOrders
} = require("../db/orders.js")

const router = express.Router();

router.get("/", (req, res) => {
    res.send("getting all orders")
});

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