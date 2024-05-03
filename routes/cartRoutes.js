const express = require("express");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify");
const {
  createCart,
  updateCart,
  deleteCart,
  findCart,
  findAllCarts,
} = require("../controllers/cartCtrls");

const router = express.Router();

router.get("/findallcarts", verifyAdmin, findAllCarts);

router.get("/find/:userId", verifyUser, findCart);

router.post("/create", verifyToken, createCart);

router.put("/update/:id", verifyUser, updateCart);

router.delete("/delete/:id", verifyUser, deleteCart);

module.exports = router;
