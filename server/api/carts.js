const express = require("express");
const {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
  // deleteWholeCart
} = require("../db/carts.js")
const { fetchUsersOrders } = require("../db/orders.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: /api/carts

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchUserCart({ user_id: req.user.id }));
  }
  catch (ex) {
    next(ex);
  }
});

router.get("/mycart", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders(req.user.id);
    res.send(await fetchUserCart({ order_id: orderId.id }));
  } catch (ex) {
    next(ex);
  }
});

router.post("/mycart", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = await fetchUsersOrders(req.user.id);
    res.status(201).send(await addCartProduct({
      order_id: orderId.id,
      book_id: req.body.book_id,
      qty: req.body.qty
    }));
  }
  catch (ex) {
    next(ex);
  }
});

router.put("/mycart", isLoggedIn, async (req, res, next) => {
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

//delete after check out.
// router.delete("/:id/user/:userId", async (req, res, next) => {
//   try {
//     await deleteWholeOrder({ id: req.params.id, order_id: req.params.userId });
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });


module.exports = router;