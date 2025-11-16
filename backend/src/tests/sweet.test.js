require("dotenv").config({ path: ".env" });
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const Sweet = require("../models/Sweet.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create admin user manually
  const passwordHash = await bcrypt.hash("adminpass", 10);

  const admin = await User.create({
    username: "adminuser",
    name: "Admin",
    email: "admin@example.com",
    password: passwordHash,
    role: "admin",
  });

  adminToken = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  await Sweet.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

test("Admin can create a new sweet", async () => {
  const res = await request(app)
    .post("/api/sweets/")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Ladoo",
      category: "Traditional",
      price: 20,
      quantity: 50,
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe("Ladoo");
});
