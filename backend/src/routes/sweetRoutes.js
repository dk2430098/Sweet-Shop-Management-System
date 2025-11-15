const express = require("express");
const {
  createSweet,
  getAllSweets,
  purchaseSweet,
} = require("../controllers/sweetController");

const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllSweets);
router.post("/", authenticate, isAdmin, createSweet);
router.post("/:id/purchase", authenticate, purchaseSweet);

module.exports = router;
