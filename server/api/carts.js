const express = require("express");
const {
    fetchUserCart,
    fetchCarts,
    updateCartProductQty,
    addCartProduct,
    deleteCartProduct,
    // deleteWholeCart
} = require("../db/carts.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: /api/carts

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchCarts());
  }
  catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchUserCart(req.params.id));
  }
  catch (ex) {
    next(ex);
  }
});

router.post("/user/:userId", async (req, res, next) => {
  try {
    res.status(201).send(await addCartProduct({ user_id: req.params.userId, book_id: req.body.book_id, qty: req.body.qty }));
  }
  catch (ex) {
    next(ex);
  }
});

router.put("/user/:userId", async (req, res, next) => {
  try {
    res.status(201).send(await updateCartProductQty({ qty: req.body.qty, book_id: req.params.id, user_id: req.params.userId }));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/user/:userId", async (req, res, next) => {
  try {
    await deleteCartProduct({ user_id: req.params.userId, book_id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//delete after check out.
// router.delete("/:id/user/:userId", async (req, res, next) => {
//   try {
//     await deleteWholeOrder({ id: req.params.id, user_id: req.params.userId });
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });


module.exports = router;