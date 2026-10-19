const express = require("express");

const {createUser, getOneUser, getUsers, checkUser, deleteUser} = require("../controllers/userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/users/:id", getOneUser);
router.get("/users", getUsers);
router.post("/login", checkUser);
router.delete("/user/delete/:id", deleteUser);

module.exports = router;
