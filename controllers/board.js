const Board = require("../models/board");
const mongoose = require("mongoose");
const { throwError } = require("../utils/helpers");

exports.getBoards = async (req, res, next) => {
  const userId = req.userId;
  try {
    const boards = await Board.find({ createdBy: userId });
    res.status(200).json({
      message: "Success.",
      boards,
    });
  } catch (err) {
    next(err);
  }
};

exports.createNewBoard = async (req, res, next) => {
  const title = req.body.boardTitle;
  const userId = req.userId;

  try {
    if (!title) throwError("Please enter valid title.", 422);

    const board = new Board({ title, createdBy: userId });
    const result = await board.save();
    res.status(200).json({
      message: "Board created succesfully",
      data: { id: result._id.toString(), title: result.title },
    });
  } catch (err) {
    next(err);
  }
};

exports.getBoardById = async (req, res, next) => {
  const boardId = req.params.boardId;

  try {
    if (!boardId) throwError("Invalid board id provided.", 422);

    const data = await Board.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(boardId) },
      },
      {
        $lookup: {
          from: "lists",
          let: { boardId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$boardId", "$$boardId"] } } },
            {
              $lookup: {
                from: "cards",
                let: { listId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$listId", "$$listId"] } } },
                ],
                as: "cards",
              },
            },
          ],
          as: "lists",
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateBoard = async (req, res, next) => {
  const title = req.body.title;
  const boardId = req.params.boardId;
  const userId = req.userId;

  try {
    if (!title) throwError("Please enter valid title.", 422);

    const board = await Board.findOne({ _id: boardId, createdBy: userId });
    if (!board) throwError("No boards found with that information.", 422);
    board.title = title;

    const result = await board.save();
    res.status(200).json({
      message: "Board edited succesfully",
      data: { id: result._id.toString(), title: result.title },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBoard = async (req, res, next) => {
  const boardId = req.params.boardId;
  const userId = req.userId;

  try {
    const result = await Board.deleteOne({ _id: boardId, createdBy: userId });
    if (!result) throwError("No boards found with that information.", 422);
    res.status(200).json({
      message: "Board deleted succesfully",
    });
  } catch (err) {
    next(err);
  }
};
