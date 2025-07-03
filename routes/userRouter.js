const express = require("express");
const { UserController } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();
const apiRouter = express.Router();

apiRouter.get("/getAllUsers", UserController.getUsers);
apiRouter.post("/createUser", verifyToken, UserController.createUser);
apiRouter.put("/updateUser/:id", verifyToken, UserController.updateUser);
apiRouter.delete("/deleteUser/:id", verifyToken, UserController.deleteUser);

router.use("/api", apiRouter);
module.exports = router;
