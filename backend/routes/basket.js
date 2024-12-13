const express = require("express");
const basketController = require("../controllers/basket");

const router = express.Router();

router.post("/", basketController.createBasket);
router.get("/:userId", basketController.getBasket);
router.delete("/", basketController.deleteBasket);
router.post("/clear", basketController.clearBasket);

module.exports = router;
