const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    console.log("Database connection successful!".red.bold);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
