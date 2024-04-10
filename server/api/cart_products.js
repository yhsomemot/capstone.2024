const express = require("express");
const {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
} = require("../db/cart_products.js")
const { fetchUsersOrders, createOrder } = require("../db/orders.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: /api/carts

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders({user_id:req.user.id});
    // console.log({orderId}, 'THIS IS LINE 29 FROM FETCHING');
    
    //If this comes back as false
    //We need to create a cart for the User

    res.send(await fetchUserCart({ order_id: orderId.id }));
  } catch (ex) {
    next(ex);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders(req.user.id);
    if (!orderId) {
      const order = await createOrder({user_id:req.user.id});
      
      res.status(201).send(await addCartProduct({
        order_id: order.id,
        book_id: req.body.book_id,
        qty: req.body.qty
      }))
      // Using Order as Cart
      //If orderId is falsy, create an Order
    }
  }
  catch (ex) {
    next(ex);
  }
});

router.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders(req.user.id);
    res.status(201).send(await updateCartProductQty({
      qty: req.body.qty,
      book_id: req.body.book_id,
      order_id: orderId.id
    }));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:bookId", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders(req.user.id);
    await deleteCartProduct({ 
      order_id: orderId.id,
      book_id: req.params.book_id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;