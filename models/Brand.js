const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide a brand name"],
      trim: true,
      maxLength: [100, "Brand name shouldn't exceed 100 characters"],
      unique: true,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please, provide a valid email"],
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please, provide a valid url"],
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
