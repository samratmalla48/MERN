import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const addOrderItems = asyncHandler(async (req, res) => {
  // const orders = await Order.find({});
  // res.json(orders);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrders = () => {};

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);

  res.send("get order items");
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //   const orders = await Order.find({});
  //   res.json(orders);

  res.send("update order delivered");
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log("entry");
  const order = await Order.findById(req.params.id);

  if (order) {
    console.log("chagnge");
    order.isPaid = true;
    order.paidAt = Date.now;
    console.log(order.isPaid)
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: "test@email.com",
    };
    
    const updatedOrder = await order.save();
    console.log(updatedOrder)
    res.status(200).json(updatedOrder);
    
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
  //   res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
