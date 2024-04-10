const express = require("express");
const {

} =require ("../db/checkouts.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: api/checkout

router.post("/", isLoggedIn, async(req, res, next)=> {
    try{
        const orderId = await fetchUsersOrders(req,user.id);
        res.send(await checkoutCart({
            order_id: orderId.id
        }))
    } catch(ex) {
        next(ex);
    }
});

module.exports = router;