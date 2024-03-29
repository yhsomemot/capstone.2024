const express = require("express");
const {
    fetchProducts,
    fetchSingleProduct,
    createProduct
} = require("../db/products.js")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.send(await fetchProducts());
      }
      catch (ex) {
        next(ex);
      }
});
router.get("/:id", async (req, res, next) => {
    try {
        res.send(await fetchSingleProduct({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.post("/", async (req, res, next) => {
    try {
        res.status(201).send(await createProduct(req.body));
      } catch (ex) {
        next(ex);
      }
});
router.put("/:id", async (req, res, next) => {
    try {
        res.status(201).send(await updateProduct({...req.body, id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.delete("/:id", async (req, res, next) => {
    try {
        res.status(204).send(await deleteProduct({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});

module.exports = router;