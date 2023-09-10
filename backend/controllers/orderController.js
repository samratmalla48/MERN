import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const addOrderItems = asyncHandler(async (req, res) => {
  //   const orders = await Order.find({});
  //   res.json(orders);

  res.send("add order items");
});

const getMyOrders = asyncHandler(async (req, res) => {
    //   const orders = await Order.find({});
    //   res.json(orders);
  
    res.send("get order items");
  });


  const getOrderById = asyncHandler(async (req, res) => {
    //   const orders = await Order.find({});
    //   res.json(orders);
  
    res.send("get order id");
  });