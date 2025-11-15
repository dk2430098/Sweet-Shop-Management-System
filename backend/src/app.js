const express = require("express");
const cors = require("cors");
const { authenticate } = require("./middleware/auth.js");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Protected test route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ msg: "Protected route accessed" });
});

app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API" });
});

module.exports = app;
