const express = require("express");
const {
    fetchOrders,
    createOrder,
    fetchUsersOrders
} = require("../db/orders.js")

//route: api/orders

const router = express.Router();
const { isLoggedIn } = require("../db/auth.js")

router.get("/", async (req, res, next) => {
    try {
        res.send(await fetchOrders());
    }
    catch (ex) {
        next(ex);
    }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await fetchUsersOrders({ user_id: req.params.id }));
    }
    catch (ex) {
        next(ex);
    }
});

router.post("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(201).send(await createOrder({ user_id: req.params.user_id, id: req.body.id }));
    }
    catch (ex) {
        next(ex);
    }
});

module.exports = router;