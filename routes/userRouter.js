const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser} = require("../controllers/userController");

// make this wrapping the /api by defining apiRouter variable
const apiRouter = express.Router();

apiRouter.get("/getAllUsers", getUsers);
apiRouter.post("/createUser", createUser);
apiRouter.delete("/deleteUser/:id", deleteUser);
apiRouter.put("/updateUser/:id", updateUser);

router.use("/api",apiRouter)

module.exports = router;
