const express = require("express");
const {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
  fetchUsersOrders, 
  createOrder
} = require("../db/cart_products.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: /api/mycart

router.get("/orders", isLoggedIn, async (req, res, next) => {
  try {
      res.send(await fetchUsersOrders({ user_id: req.user.id }));
  }
  catch (ex) {
      next(ex);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders({ user_id: req.user.id });
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
    // console.log("LINE 32", orderId)
    if (!orderId) {
      const order = await createOrder({ user_id: req.user.id });
      res.status(201).send(await addCartProduct({
        order_id: order.id,
        book_id: req.body.book_id,
        qty: req.body.qty
      }));
      // Using Order as Cart
      //If orderId is falsy, create an Order
    } else {
      res.send(await addCartProduct({
        order_id: orderId.id,
        book_id: req.body.book_id,
        qty: req.body.qty
      }));
    }
  } catch (ex) {
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
      book_id: req.params.bookId
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;