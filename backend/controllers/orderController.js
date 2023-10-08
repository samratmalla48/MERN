import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import nodemailer from "nodemailer"; // Import Nodemailer

const addOrderItems = asyncHandler(async (req, res) => {
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

    // Send an email with the list of items
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "samratmalla48@gmail.com",
        pass: "ttgr ofix cqpu uedk",
      },
    });

    const mailOptions = {
      from: "samratmalla48@gmail.com",
      to: req.user.email, // Send the email to the user who placed the order
      subject: "Order Confirmation",
      html: `
<html>
<head>
<style>
body {
font-family: Arial, sans-serif;
}
.email-container {
background-color: #f5f5f5;
padding: 20px;
border-radius: 10px;
}
.header {
background-color: #007bff;
color: #fff;
padding: 10px;
text-align: center;
font-size: 24px;
}
.order-details {
background-color: #fff;
padding: 20px;
border-radius: 5px;
box-shadow: 0px 0px 5px 0px #ccc;
}
ul {
list-style-type: none;
padding: 0;
}
li {
margin-bottom: 10px;
}
.item-name {
font-weight: bold;
}
.item-quantity {
font-style: italic;
}
.item-price {
font-weight: bold;
}
.totals {
font-weight: bold;
}
</style>
</head>
<body>
<div class="email-container">
<div class="header">
Order Confirmation
</div>
<div class="order-details">
<p>Thank you for your order. Here is the list of items:</p>
<ul>
${orderItems
  .map(
    (item) => `
<li>
<span class="item-name">${item.name}</span>:
<span class="item-quantity">${item.qty} x</span>
<span class="item-price">$${item.price}</span>
</li>
`
  )
  .join("")}
</ul>
<p class="totals">Tax Price: $${taxPrice}</p>
<p class="totals">Total Price: $${totalPrice}</p>
</div>
</div>
</body>
</html>
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        // Handle the error if email sending fails
      } else {
        console.log("Email sent: " + info.response);
        // Email sent successfully
      }
    });

    res.status(201).json(createdOrder);
  }
});

const getOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

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
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now;
    console.log(order.isPaid);
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
  // res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
