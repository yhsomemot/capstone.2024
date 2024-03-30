const express = require("express");
const {
    fetchProducts,
    fetchSingleProduct,
    createProduct,
    updateProduct, 
    deleteProduct
} = require("../db/products.js")
const { isLoggedIn }=require("../db/auth.js")

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
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        res.status(201).send(await createProduct(req.body));
      } catch (ex) {
        next(ex);
      }
});
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(201).send(await updateProduct({...req.body, id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(204).send(await deleteProduct({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});

module.exports = router;