const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const categoryShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide a category name"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please, provide a valid image URL"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categoryShema);

module.exports = Category;
