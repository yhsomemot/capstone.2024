const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("getting all users")
});

router.post("/", (req, res) => {
    res.send(`creating a user with this data: ${JSON.stringify(req.body)}`)
});

router.put("/:id", (req, res) => {
    res.send(`updating a user with this data: ${JSON.stringigy(req.body)}`)
});

router.delete("/:id", (req, res) => {
    res.send(`deleted user with id ${req.params.id}`)
});

module.exports = router;