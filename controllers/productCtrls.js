const Product = require("../models/Product");
const createError = require("../utils/error");

// ************* Find all products *************
const findAllProducts = async (req, res, next) => {
  console.log(req.query);
  const qnew = req.query.new;
  const qcat = req.query.category;

  try {
    let products;
    if (qnew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (qcat) {
      products = await Product.find({ categories: { $in: qcat } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// ************* Find a product *************
const findAProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      return next(createError(400, "Product not found"));
    }
  } catch (error) {
    next(error);
  }
};

// ************* Create a product *************
const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// ************* Update a product *************
const updateAProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(createError(400, "Product not found"));
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// ************* Delete a product *************
const deleteAProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(createError(400, "Product not found"));
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateAProduct,
  deleteAProduct,
  findAProduct,
  findAllProducts,
};
