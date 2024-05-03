require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//////////////////////////////////////////////

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stripeRoutes = require("./routes/stripeRoutes");

//////////////////////////////////////////////

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8000;

//////////////////////////////////////////////

const app = express();
app.use(express.json());
app.use(cors());

//////////////////////////////////////////////

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("database connected successfully");
    app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

connectDB();

/////////////////////////////////////////////

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/stripe", stripeRoutes);

///////////////////////////////////////////

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  const stack = err.stack;
  return res.status(status).json({
    status,
    message,
    stack,
    success: false,
  });
});
