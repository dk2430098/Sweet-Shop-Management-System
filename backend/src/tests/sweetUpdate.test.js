require("dotenv").config({ path: ".env" });

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const Sweet = require("../models/Sweet.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  // Reset collection
  await Sweet.deleteMany({});

  // Create a sweet to update
  await Sweet.create({
    name: "Gulab Jamun",
    category: "Milk",
    price: 100,
    quantity: 50,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Update sweet details using PUT /api/sweets/:id", async () => {
  const sweet = await Sweet.findOne({ name: "Gulab Jamun" });

  const res = await request(app).put(`/api/sweets/${sweet._id}`).send({
    price: 150,
    quantity: 40,
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.price).toBe(150);
  expect(res.body.quantity).toBe(40);
});
