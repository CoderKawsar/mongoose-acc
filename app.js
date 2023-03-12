const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const productRoute = require("./routes/product.route");

app.use("/api/v1/products/", productRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
