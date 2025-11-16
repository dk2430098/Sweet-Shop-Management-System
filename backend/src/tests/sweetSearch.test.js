require("dotenv").config();

const request = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");
const Sweet = require("../models/Sweet.js");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Sweet.deleteMany({});

  await Sweet.create([
    { name: "Kaju Katli", category: "Dry", price: 200, quantity: 10 },
    { name: "Rasgulla", category: "Milk", price: 120, quantity: 20 },
    { name: "Laddu", category: "Festival", price: 80, quantity: 5 },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Search Sweets API", () => {
  test("Search by name", async () => {
    const res = await request(app).get("/api/sweets/search?name=lad");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Laddu");
  });

  test("Search by category", async () => {
    const res = await request(app).get("/api/sweets/search?category=Milk");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].category).toBe("Milk");
  });

  test("Search by price range", async () => {
    const res = await request(app).get(
      "/api/sweets/search?minPrice=100&maxPrice=150"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Rasgulla");
  });

  test("Search by name + category + price", async () => {
    const res = await request(app).get(
      "/api/sweets/search?name=ka&category=Dry&minPrice=150&maxPrice=250"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Kaju Katli");
  });
});
