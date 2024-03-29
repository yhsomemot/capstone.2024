const express = require("express");
const {
    fetchProducts
} = require("../db/products.js")

const router = express.Router();

router.get("/", (req, res) => {
    res.send("getting all products")
});

router.post("/", (req, res) => {
    res.send(`creating a products with this data: ${JSON.stringify(req.body)}`)
});

router.put("/:id", (req, res) => {
    res.send(`updating a products with id ${req.params.id} this data: ${JSON.stringify(req.body)}`)
});

router.delete("/:id", (req, res) => {
    res.send(`deleted products with id ${req.params.id}`)
});

module.exports = router;