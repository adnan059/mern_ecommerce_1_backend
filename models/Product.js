const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Product description is required"],
    },
    img: {
      type: String,
      required: [true, "Product image is required"],
    },
    categories: {
      type: Array,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(uniqueValidator, {
  message:
    "Another product with the same {PATH} already exists. Please try with another one.",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
