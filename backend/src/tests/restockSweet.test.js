const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Sweet = require("../models/Sweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let adminToken;
let sweetId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create admin user
  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    passwordHash: "dummy",
    role: "admin",
  });

  adminToken = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET
  );

  // Create a sweet item
  const sweet = await Sweet.create({
    name: "Gulab Jamun",
    price: 50,
    quantity: 5,
  });

  sweetId = sweet._id;
});

afterAll(async () => {
  await Sweet.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

test("Admin should restock a sweet successfully", async () => {
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ amount: 10 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(15);
});

test("Non-admin should not restock", async () => {
  const userToken = jwt.sign(
    { id: "any", role: "user" },
    process.env.JWT_SECRET
  );

  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .set("Authorization", `Bearer ${userToken}`)
    .send({ amount: 5 });

  expect(res.statusCode).toBe(403);
});
