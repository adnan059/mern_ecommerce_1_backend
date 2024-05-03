const express = require("express");
const { registCtrl, loginCtrl } = require("../controllers/authCtrls");

const router = express.Router();

// register
router.post("/register", registCtrl);

// login
router.post("/login", loginCtrl);

module.exports = router;
