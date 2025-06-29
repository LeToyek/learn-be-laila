const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser} = require("../controllers/userController");

router.get("/api/getAllUsers", getUsers);
router.post("/api/createUser", createUser);
router.delete("/api/deleteUser/:id", deleteUser);
router.put("/api/updateUser/:id", updateUser);

module.exports = router;
