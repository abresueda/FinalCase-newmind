const express = require("express");
const userController = require("../controllers/user"); // Import without destructuring
const { message } = require("statuses");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

//örnek
router.post("/korumali", authMiddleware, function test(req, res) {
  console.log("test");
  res.status(200).send({ message: "success" });
});

router.put("/", userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/", authMiddleware, userController.getAllUser);
router.get("/:id", authMiddleware, userController.getUser);

router.post("/order", userController.createOrder);

module.exports = router;
