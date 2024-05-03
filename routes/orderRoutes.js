const express = require("express");
const { verifyToken, verifyAdmin, verifyUser } = require("../utils/verify");
const {
  creatOrder,
  updateOrder,
  deletOrder,
  findOrder,
  findAllOrders,
  findIncome,
} = require("../controllers/orderCtrls");

const router = express.Router();

router.get("/findincome", verifyAdmin, findIncome);

router.get("/find/:userId", verifyUser, findOrder);

router.get("/findallorders", verifyAdmin, findAllOrders);

router.post("/create", verifyToken, creatOrder);

router.put("/update/:id", verifyAdmin, updateOrder);

router.delete("/delete/:id", verifyAdmin, deletOrder);

module.exports = router;
