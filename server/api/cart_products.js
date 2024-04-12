const express = require("express");
const {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
} = require("../db/cart_products.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: /api/mycart


router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchUserCart(req.user.id));
  } catch (ex) {
    next(ex);
  }
});

//add cart product
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await addCartProduct({
      user_id: req.user.id,
      book_id: req.body.book_id,
      qty: req.body.qty
    }))
  } catch (ex) {
    next(ex);
  }
});

// router.put("/", isLoggedIn, async (req, res, next) => {
//   try {
//     const orderId = await fetchUsersOrders(req.user.id);
//     res.status(201).send(await updateCartProductQty({
//       qty: req.body.qty,
//       book_id: req.body.book_id,
//       order_id: orderId.id
//     }));
//   } catch (ex) {
//     next(ex);
//   }
// });

router.delete("/:bookId", isLoggedIn, async (req, res, next) => {
  try {
    res.status(204).send(await deleteCartProduct(req.user.id, req.params.bookId))
  } catch (ex) {
    next(ex);
  }
});
// app.delete('/api/product/:id', isLoggedIn, isAdmin, async (req, res, next) => {
//   try {
//     res.status(204).send(await deleteProduct({id: req.params.id}));
//   } catch (ex) {
//     next(ex);
//   }
// });
module.exports = router;