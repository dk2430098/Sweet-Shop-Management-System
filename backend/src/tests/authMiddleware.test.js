const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Should block access when no token is provided", async () => {
  const res = await request(app).get("/api/protected");

  expect(res.statusCode).toBe(401);
  expect(res.body.msg).toBe("No token provided");
});

test("Should allow access when a valid token is provided", async () => {
  const token = jwt.sign(
    { id: "123", email: "test@example.com" },
    process.env.JWT_SECRET
  );

  const res = await request(app)
    .get("/api/protected")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.msg).toBe("Protected route accessed");
});
