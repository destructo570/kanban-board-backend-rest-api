const express = require("express");
const cardController = require("../controllers/card");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.post("/", isAuth, cardController.createNewCard);
router.put("/", isAuth, cardController.updateCard);
router.delete("/:cardId", isAuth, cardController.deleteCard);

module.exports = router;
