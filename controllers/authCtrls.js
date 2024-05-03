const createError = require("../utils/error");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//  ********* register *************

const registCtrl = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const { _id, password, ...others } = newUser._doc;

    const token = jwt.sign(
      { id: _id, isAdmin: newUser.isAdmin },
      process.env.SK,
      { expiresIn: "1d" }
    );

    res.status(201).json({ _id, token, ...others });
  } catch (error) {
    next(error);
  }
};

// ************ login **************
const loginCtrl = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(400, "Wrong Credentials!"));
    }
    console.log(req.body.password);

    const isValidPswd = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPswd) return next(createError(400, "Wrong Credentialssssss!"));

    const { _id, password, ...others } = user._doc;

    const token = jwt.sign({ id: _id, isAdmin: user.isAdmin }, process.env.SK, {
      expiresIn: "1d",
    });

    res.status(200).json({ _id, token, ...others });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registCtrl,
  loginCtrl,
};
