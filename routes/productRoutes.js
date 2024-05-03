const express = require("express");
const {
  createProduct,
  updateAProduct,
  deleteAProduct,
  findAProduct,
  findAllProducts,
} = require("../controllers/productCtrls");
const { verifyAdmin } = require("../utils/verify");
const router = express.Router();

router.get("/findallproducts", findAllProducts);

router.get("/find/:id", findAProduct);

router.post("/create", verifyAdmin, createProduct);

router.put("/update/:id", verifyAdmin, updateAProduct);

router.delete("/delete/:id", verifyAdmin, deleteAProduct);

module.exports = router;
