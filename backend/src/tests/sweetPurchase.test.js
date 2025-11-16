require("dotenv").config({ path: ".env" });

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const Sweet = require("../models/Sweet.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create dummy user
  const user = await User.create({
    username: "deepak",
    email: "deepak@example.com",
    password: "xyz",
    role: "user",
  });

  // Generate token
  global.token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET
  );
});

afterAll(async () => {
  await Sweet.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

test("purchase sweet should decrease quantity by 1", async () => {
  const sweet = await Sweet.create({
    name: "Gulab Jamun",
    category: "Sweets",
    price: 100,
    quantity: 5,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${global.token}`)
    .send();

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(4); // 5 -> 4
});

test("should return 400 if sweet is out of stock", async () => {
  const sweet = await Sweet.create({
    name: "Ladoo",
    category: "Traditional",
    price: 50,
    quantity: 0,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${global.token}`)
    .send();

  expect(res.statusCode).toBe(400);
  expect(res.body.msg).toBe("Out of stock");
});
