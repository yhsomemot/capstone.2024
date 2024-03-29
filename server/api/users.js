const express = require("express");
const {
    fetchUsers,
    createUser
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

router.put("/:id", (req, res) => {
    res.send(`updating a user with id ${req.params.id} this data: ${JSON.stringify(req.body)}`)
});

router.delete("/:id", (req, res) => {
    res.send(`deleted user with id ${req.params.id}`)
});

module.exports = router;