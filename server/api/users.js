const express = require("express");
const {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../db/users.js")

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.send(await fetchUsers());
      }
      catch (ex) {
        next(ex);
      }
});
router.post("/", async (req, res, next) => {
    try {
        res.send(await createUser(req.body));
      }
      catch (ex) {
        next(ex);
      }
});
router.put("/:id", async (req, res, next) => {
    try {
        res.status(201).send(await updateUser({...req.body, id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.delete("/:id", async (req, res, next) => {
    try {
        res.status(204).send(await deleteUser({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});

module.exports = router;