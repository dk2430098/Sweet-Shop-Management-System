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

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
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

exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ msg: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ msg: "Out of stock" });
    }

    //  1 item purchase always
    sweet.quantity -= 1;

    await sweet.save();

    return res.status(200).json(sweet);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};
