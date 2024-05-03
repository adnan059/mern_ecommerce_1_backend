const express = require("express");
const { verifyToken, verifyAdmin, verifyUser } = require("../utils/verify");
const {
  updateUser,
  deleteUser,
  findAnUser,
  findAllUsers,
  findUserStats,
} = require("../controllers/userCtrls");

const router = express.Router();

router.get("/stats", verifyAdmin, findUserStats);

router.get("/findallusers", verifyAdmin, findAllUsers);

router.get("/find/:id", verifyAdmin, findAnUser);

router.put("/update/:id", verifyUser, updateUser);

router.delete("/delete/:id", verifyUser, deleteUser);

module.exports = router;
