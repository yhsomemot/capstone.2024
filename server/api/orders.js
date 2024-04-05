const express = require("express");
const {
  fetchSingleOrder,
  fetchOrders,
  updateOrders,
  createOrders,
  deleteOrderProducts,
  deleteWholeOrder
} = require("../db/orders.js")
const { isLoggedIn } = require("../db/auth.js")

const router = express.Router();

//route: /api/orders

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchOrders());
  }
  catch (ex) {
    next(ex);
  }
});
router.get("/user/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleOrder(req.params.id));
  }
  catch (ex) {
    next(ex);
  }
});
router.post("/user/:userId/book/:id", async (req, res, next) => {
  try {
    res.status(201).send(await createOrders({ user_id: req.params.userId, book_id: req.body.book_id, qty: req.body.qty }));
  }
  catch (ex) {
    next(ex);
  }
});
router.put("/user/:userId/book/:id", async (req, res, next) => {
  try {
    res.status(201).send(await updateOrders({ qty: req.body.qty, book_id: req.params.id, user_id: req.params.userId }));
  } catch (ex) {
    next(ex);
  }
});
router.delete("/user/:userId/book/:id", async (req, res, next) => {
  try {
    await deleteOrderProducts({ user_id: req.params.userId, book_id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
//delete after check out.
router.delete("/:id/user/:userId", async (req, res, next) => {
  try {
    await deleteWholeOrder({ id: req.params.id, user_id: req.params.userId });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});


module.exports = router;