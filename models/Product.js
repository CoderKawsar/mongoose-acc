const { default: mongoose } = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least of 3 characters"],
      maxLength: [100, "Name is too large"],
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
        validate: {
          validator: (values) => {
            return validator.isURL(values);
            // if (!Array.isArray(value)) {
            //   return false;
            // }
            // let isValid = true;
            // value.forEach((url) => {
            //   if (!validator.isURL(url)) {
            //     isValid = false;
            //   }
            // });
            // return isValid;
          },
          message: "Please, provide valid image urls",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
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
// productSchema.pre("save", function (next) {
//   console.log("Before saving data");
//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

// sending method to productSchema so that I can use it there
// productSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.name}`);
// };

// product model
const Product = mongoose.model("Product", productSchema);
// const Product = mongoose.model('Model Name', SchemaName)

module.exports = Product;
