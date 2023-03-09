const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least of 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
      // enum: ["kg", "litre", "pcs"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be integer value",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message:
          "status can't be {VALUE}. It must be in-stock/out-of-stock/discontinued",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre/post
productSchema.pre("save", function (next) {
  console.log("Before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

// sending method to productSchema so that I can use it there
productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// product model
const Product = mongoose.model("Product", productSchema);
// const Product = mongoose.model('Model Name', SchemaName)

// posting to database
app.post("/api/v1/product", async (req, res, next) => {
  try {
    // using save
    const product = new Product(req.body);
    const result = await product.save();

    result.logger();

    // using create
    // const result = await Product.create(req.body);

    // const product = new Product(req.body);
    // if (product.quantity == 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Product saved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data not saved",
      error: error.message,
    });
  }
});

app.get("/api/v1/product", async (req, res, next) => {
  try {
    // const products = await Product.find({});

    // const products = await Product.find({ _id: "6408a34606391a7010b228d7" });

    // const products = await Product.find({
    //   $or: [{ _id: "6408a446e6172526c287bc67" }, { name: "Hammer" }],
    // });

    // const products = await Product.find({
    //   status: { $ne: "out-of-stock" },
    // });

    // const products = await Product.find({
    //   quantity: { $gte: 20 },
    // });

    // const products = await Product.find({
    //   name: { $in: ["chal", "dal"] },
    // });

    // only name and quantity fields are served
    // const products = await Product.find({}, "name quantity");

    // all fields shown except name and quantity
    // const products = await Product.find({}, "-name -quantity");

    // only limited(2) products should be shown
    // const products = await Product.find({}, "-name -quantity").limit(2);

    // sort data by quantity in descending order
    // const products = await Product.find({}).sort({
    //   quantity: -1,
    // });

    // projection - only name field to be shown
    // const products = await Product.find({}).select({
    //   name: 1,
    // });

    // const products = await Product.find({}).where("name").equals("Hammer");
    // const products = await Product.find({})
    //   .where("name")
    //   .equals("Hammer")
    //   .where("quantity")
    //   .gte(10);

    // const products = await Product.find({})
    //   .where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gt(10)
    //   .limit(3);

    // const products = await Product.findById("6408a446e6172526c287bc67");
    // const products = await Product.findById(undefined);
    // const products = await Product.find({ _id: undefined });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get data",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
