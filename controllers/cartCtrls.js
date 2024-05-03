const Cart = require("../models/Cart");
const createError = require("../utils/error");

// ************* find all carts **************
const findAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

// ************ find a User's cart **********
const findCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// *************** create a cart *****************
const createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};

// *************** update a cart *****************
const updateCart = async (req, res, next) => {
  try {
    const cart = Cart.findById(req.params.id);
    if (!cart) return next(createError(400, "Cart not found"));
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: { userId: req.body.userId, products: req.body.products },
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

// *************** delete a cart *****************
const deleteCart = async (req, res, next) => {
  try {
    const cart = Cart.findById(req.params.id);
    if (!cart) return next(createError(400, "Cart not found"));
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "cart successfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCart, updateCart, deleteCart, findCart, findAllCarts };
