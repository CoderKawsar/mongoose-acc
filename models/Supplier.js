const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const validator = require("validator");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: [100, "Name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "Please, provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please, provide a valid mobile number",
        },
      },
    ],
    emergencyContactNumber: [
      {
        type: String,
        required: [true, "Please, provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please, provide a valid mobile number",
        },
      },
    ],
    tradeLicenceNumber: {
      type: String,
      required: [true, "Please, provide a trade licence number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please, provide supplier's present address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please, provide supplier's permanent address"],
    },
    location: {
      type: String,
      required: true,
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
        message: "{{VALUE}} is not a correct division",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please, provide a valid URL"],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [
        validator.isURL,
        "Please, provide a valid national ID image URL",
      ],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "discontinued"],
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
