const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: String,
});

module.exports = mongoose.model("Sweet", sweetSchema);
