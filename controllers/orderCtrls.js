const Order = require("../models/Order");
const createError = require("../utils/error");

// ************* find monthly income **************
const findIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};

// ************* find all orders **************
const findAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// ************ find a User's order **********
const findOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// *************** create a order *****************
const creatOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

// *************** update a order *****************
const updateOrder = async (req, res, next) => {
  try {
    const order = Order.findById(req.params.id);
    if (!order) return next(createError(400, "Order not found"));
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userId: req.body.userId,
          products: req.body.products,
          amount: req.body.amount,
          address: req.body.address,
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// *************** delete a order *****************
const deletOrder = async (req, res, next) => {
  try {
    const order = Order.findById(req.params.id);
    if (!order) return next(createError(400, "Order not found"));
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "order successfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  creatOrder,
  updateOrder,
  deletOrder,
  findOrder,
  findAllOrders,
  findIncome,
};
