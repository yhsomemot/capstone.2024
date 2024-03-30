const express = require("express");
const {
    fetchAllOrders,
    fetchOrders,
    updateOrders,
    createOrders,
    deleteWholeOrder,
    deleteOrderProducts
} = require("../db/orders.js")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.send(await fetchAllOrders());
      }
      catch (ex) {
        next(ex);
      }
});
router.get("/user/:id", async (req, res, next) => {
    try {
        res.send(await fetchOrders(req.params.id));
      }
      catch (ex) {
        next(ex);
      }
});
router.post("/user/:userId/product/:id", async (req, res, next) => {
    try {
        res.status(201).send(await createOrders({ user_id: req.params.userId, product_id: req.body.product_id, qty: req.body.qty }));
      }
      catch (ex) {
        next(ex);
      }
});
router.put("/user/:userId/product/:id", async (req, res, next) => {
    try {
        res.status(201).send(await updateOrders({ qty: req.body.qty, product_id: req.params.id, user_id: req.params.userId }));
      } catch (ex) {
        next(ex);
      }
});
router.delete("/user/:userId/product/:id", async (req, res, next) => {
    try {
        await deleteOrderProducts({ user_id: req.params.userId, product_id: req.params.id });
        res.sendStatus(204);
      } catch (ex) {
        next(ex);
      }
});
router.delete("/:id/user/:userId", async (req, res, next) => {
    try {
        await deleteWholeOrder({ id: req.params.id, user_id: req.params.userId });
        res.sendStatus(204);
      } catch (ex) {
        next(ex);
      }
});


module.exports = router;