const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

test("Database should connect successfully", async () => {
  await expect(mongoose.connect(process.env.MONGO_URI)).resolves.toBeDefined();

  await mongoose.connection.close();
});
