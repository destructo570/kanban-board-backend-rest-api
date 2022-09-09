const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = mongoose.Schema({
  title: { type: String, required: true },
  boardId: { type: Schema.Types.ObjectId, ref: "board", required: true },
});

module.exports = mongoose.model("List", listSchema);
