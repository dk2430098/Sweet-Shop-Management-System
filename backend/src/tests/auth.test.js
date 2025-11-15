require("dotenv").config({ path: ".env" });
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const User = require("../models/User.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

// ------------------ REGISTER TESTS ---------------------

test("POST /register → should register a user successfully", async () => {
  const res = await request(app).post("/api/auth/register").send({
    username: "deepak",
    email: "deepak@example.com",
    password: "password123",
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.user).toHaveProperty("id");
  expect(res.body.user.email).toBe("deepak@example.com");
});

test("POST /register → should fail if user already exists", async () => {
  await User.create({
    username: "deepak",
    email: "deepak@example.com",
    password: "123456",
  });

  const res = await request(app).post("/api/auth/register").send({
    username: "deepak",
    email: "deepak@example.com",
    password: "123456",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("User already exists");
});

// ------------------ LOGIN TESTS ---------------------

test("POST /login → should login user successfully", async () => {
  // prepare a user
  const hashed = "$2a$10$abcdefghijklmnopqrstuv"; // -> fake hash structure for bcrypt

  const user = await User.create({
    username: "deepak",
    email: "deepak@example.com",
    password: hashed,
  });

  const bcrypt = require("bcryptjs");
  jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

  const res = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: "password123",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
});

// Invalid login
test("POST /login → should fail on invalid credentials", async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "notfound@example.com",
    password: "wrong",
  });

  expect(res.statusCode).toBe(401);
  expect(res.body.message).toBe("Invalid credentials");
});
