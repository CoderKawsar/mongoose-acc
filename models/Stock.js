const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please, provide a Stock name"],
      trim: true,
      maxLength: [100, "Stock name shouldn't exceed 100 characters"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validae: [validator.isURL, "Please, provide a valid url"],
        // validate: {
        //   validator: (value) => {
        //     if (!Array.isArray(value)) {
        //       return false;
        //     }
        //     let isValid = true;
        //     value.forEach((url) => {
        //       if (!validator.imageURL(url)) {
        //         isValid = false;
        //       }
        //     });
        //     return isValid;
        //   },
        //   message: "Please, provide valid image urls",
        // },
      },
    ],
    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "{VALUE} should be in-stock/out-of-stock/discontinued",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "Please, provide a store name"],
        trim: true,
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "rajshahi",
            "sylhet",
            "barisal",
            "khulna",
            "mymenshingh",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    supplier: {
      name: {
        type: String,
        required: [true, "Please, provide a supplier name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    sellCount: {
      type: Number,
      default: 0,
      min: [0, "Sell count can't be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
