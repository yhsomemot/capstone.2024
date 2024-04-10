const express = require("express");
const {
    // createOrder,
    fetchUsersOrders
} = require("../db/orders.js")

//route: /api/orders

const router = express.Router();
const { isLoggedIn } = require("../db/auth.js")


router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await fetchUsersOrders({ user_id: req.user.id }));
    }
    catch (ex) {
        next(ex);
    }
});


module.exports = router;