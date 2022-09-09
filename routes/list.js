const express = require("express");
const listController = require("../controllers/list");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.post("/", isAuth, listController.createNewList);
router.put("/", isAuth, listController.updateList);
router.delete("/:listId", isAuth, listController.deleteList);

module.exports = router;
