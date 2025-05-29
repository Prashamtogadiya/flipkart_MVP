const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

// Controller to place order from cart 
exports.placeOrderFromCart = async (req, res) => {
  try {
    const { userId, address } = req.body;

    
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }

    const items = cart.items.map((item) => {
      const price = item.productId.price; 
      return {
        product: item.productId._id,
        quantity: item.quantity,
        price: price,
      };
    });

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log(totalAmount);
    console.log(items);

    const order = new Order({
      userId,
      items,
      address,
      totalAmount,
      paymentMethod: "COD", 
    });

    await order.save();

    await Cart.deleteOne({ userId });

    res
      .status(201)
      .json({ message: "Order placed successfully from cart", order: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//Controller to get order of particular user id
exports.getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.body; // Make sure to send userId in body
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const orders = await Order.find({ userId: Number(userId) })
      .populate("items.product")
      .exec();
    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this user" });
    }
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controller to get particular order by its id
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await Order.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controller to get all the orders from db 
exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate("items.product");
    if (!allOrders.length) {
      return res.status(404).json({ error: "No orders found" });
    }
    res.json({ allOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
