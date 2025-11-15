const express = require("express");
const {
  createSweet,
  searchSweets,
  getAllSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../controllers/sweetController");

const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllSweets);
router.get("/search", searchSweets);
router.post("/", authenticate, isAdmin, createSweet);
router.put("/:id", authenticate, isAdmin, updateSweet);
router.delete("/:id", authenticate, isAdmin, deleteSweet);
router.post("/:id/purchase", authenticate, purchaseSweet);
router.post("/:id/restock", authenticate, isAdmin, restockSweet);

module.exports = router;
