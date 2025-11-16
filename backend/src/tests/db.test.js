const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

test("Database should connect successfully", async () => {
  await expect(mongoose.connect(process.env.MONGO_URI)).resolves.toBeDefined();

  await mongoose.connection.close();
});
