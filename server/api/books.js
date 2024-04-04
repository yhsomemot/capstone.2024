const express = require("express");
const {
    fetchBooks,
    fetchSingleBook,
    createBook,
    updateBook, 
    deleteBook
} = require("../db/books.js")
const { isLoggedIn }=require("../db/auth.js")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.send(await fetchBooks());
      }
      catch (ex) {
        next(ex);
      }
});
router.get("/:id", async (req, res, next) => {
    try {
        res.send(await fetchSingleBook({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        res.status(201).send(await createBook(req.body));
      } catch (ex) {
        next(ex);
      }
});
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(201).send(await updateBook({...req.body, id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(204).send(await deleteBook({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});

module.exports = router;