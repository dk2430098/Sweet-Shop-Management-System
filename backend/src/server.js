const dotenv = require("dotenv");
const app = require("./app.js");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
