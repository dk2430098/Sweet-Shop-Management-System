require("dotenv").config({ path: ".env" });

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const User = require("../models/User.js");
const Sweet = require("../models/Sweet.js");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});
  await mongoose.connection.close();
});

// Utility → Generate admin token
const createAdminToken = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toString(),
    role: "admin",
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

test("Admin should delete a sweet successfully", async () => {
  const token = createAdminToken();

  // Create Sweet
  const sweet = await Sweet.create({
    name: "Ladoo",
    category: "Indian",
    price: 150,
    quantity: 20,
  });

  const res = await request(app)
    .delete(`/api/sweets/${sweet._id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(204);

  const exists = await Sweet.findById(sweet._id);
  expect(exists).toBeNull();
});

test("Non-admin user should NOT delete a sweet", async () => {
  const userToken = jwt.sign(
    { id: "dummy-user", role: "user" },
    process.env.JWT_SECRET
  );

  const sweet = await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 200,
    quantity: 10,
  });

  const res = await request(app)
    .delete(`/api/sweets/${sweet._id}`)
    .set("Authorization", `Bearer ${userToken}`);

  expect(res.statusCode).toBe(403);
});
