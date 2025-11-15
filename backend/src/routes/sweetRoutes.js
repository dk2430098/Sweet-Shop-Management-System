const express = require("express");
const {
  createSweet,
  searchSweets,
  getAllSweets,
  updateSweet,
  purchaseSweet,
} = require("../controllers/sweetController");

const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.post("/", authenticate, isAdmin, createSweet);
router.put("/:id", authenticate, isAdmin, updateSweet);
router.post("/:id/purchase", authenticate, purchaseSweet);

module.exports = router;
