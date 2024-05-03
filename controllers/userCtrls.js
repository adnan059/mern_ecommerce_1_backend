const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");

// ********** Find an user *********
const findAnUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select({ password: 0 });
    if (!user) return next(createError(400, "User not found"));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ********** Find all user *********
const findAllUsers = async (req, res, next) => {
  try {
    const q = req.query.new;
    const users = q
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find().select({ password: 0 }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ********** Find user stats *********
const findUserStats = async (req, res, next) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },

      { $project: { month: { $month: "$createdAt" } } },

      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// ********** Update an user *********
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(createError(400, "User not found!"));

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
      },
      { new: true }
    ).select({ password: 0 });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// ********** Delete an user *********

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(createError(400, "User not found!"));

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  findAnUser,
  findAllUsers,
  findUserStats,
};
