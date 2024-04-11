const express = require("express");
const {
    fetchUser,
    createUser,
    updateUser,
    deleteUser
} = require("../db/users.js")
const {
  authenticate,
  isLoggedIn,
  findUserWithToken
} = require("../db/auth.js");

const router = express.Router();

// route: /api/users

router.post('/login', async (req, res, next) => {
    try {
      res.send(await authenticate(req.body));
    }
    catch (ex) {
      next(ex);
    }
  });
router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
      res.send(await findUserWithToken(req.headers.authorization));
    }
    catch (ex) {
      next(ex);
    }
  });
router.post("/register", async (req, res, next) => {
    try {
        res.send(await createUser(req.body));
      }
      catch (ex) {
        next(ex);
      }
});

//fetch single user
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await fetchUser(req.user.id));
      }
      catch (ex) {
        next(ex);
      }
});
//fetch all users for admin
// router.get("/", isLoggedIn, async (req, res, next) => {
//   try {
//       res.send(await fetchUsers());
//     }
//     catch (ex) {
//       next(ex);
//     }
// });
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(201).send(await updateUser({...req.body, id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        res.status(204).send(await deleteUser({id: req.params.id}));
      } catch (ex) {
        next(ex);
      }
});

module.exports = router;