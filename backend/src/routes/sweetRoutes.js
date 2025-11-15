const express = require("express");
const { createSweet, getAllSweets } = require("../controllers/sweetController");

const { authenticate, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllSweets);
router.post("/", authenticate, isAdmin, createSweet);

module.exports = router;
