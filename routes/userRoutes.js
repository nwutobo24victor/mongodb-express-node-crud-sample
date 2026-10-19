const express = require("express");

const {createUser, getOneUser, getUsers, checkUser, deleteUser, updateUser} = require("../controllers/userController");

const router = express.Router();

router.post("/user/create", createUser);
router.get("/users/:id", getOneUser);
router.get("/users", getUsers);
router.post("/user/login", checkUser);
router.delete("/user/delete/:id", deleteUser);
router.patch("/user/update/:id", updateUser);

module.exports = router;
