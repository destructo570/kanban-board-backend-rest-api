const express = require("express");
const boardController = require("../controllers/board");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/", isAuth, boardController.getBoards);
router.post("/", isAuth, boardController.createNewBoard);
router.get("/:boardId", isAuth, boardController.getBoardById);
router.put("/:boardId", isAuth, boardController.updateBoard);
router.delete("/:boardId", isAuth, boardController.deleteBoard);

module.exports = router;
