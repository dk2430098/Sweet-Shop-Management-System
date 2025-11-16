require("dotenv").config({ path: ".env" });
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const Sweet = require("../models/Sweet.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await Sweet.deleteMany({});
  await mongoose.connection.close();
});

test("GET /api/sweets should list all sweets", async () => {
  // seed data
  await Sweet.create({
    name: "Ladoo",
    category: "Traditional",
    price: 50,
    quantity: 10,
  });

  await Sweet.create({
    name: "Barfi",
    category: "Milk-based",
    price: 100,
    quantity: 5,
  });

  const res = await request(app).get("/api/sweets");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThanOrEqual(2);
  expect(res.body[0]).toHaveProperty("name");
});
