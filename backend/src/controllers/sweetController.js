const mongoose = require("mongoose");
const Sweet = require("../models/Sweet");

exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description, imageUrl } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name, category, price, and quantity required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl,
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
