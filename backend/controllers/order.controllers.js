const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

/**
 * Controller to place an order from a user's cart
 */
exports.placeOrderFromCart = async (req, res) => {
  try {
    // Extract userId and address from request body
    const { userId, address } = req.body;

    // Find the user's cart and populate the product details
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    // If cart is not found or is empty
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }

    // Extract product details from cart items
    const items = cart.items.map((item) => {
      const price = item.productId.price; // Assuming 'price' exists in Product model
      return {
        product: item.productId._id,
        quantity: item.quantity,
        price: price,
      };
    });

    // Calculate the total amount for the order
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log(totalAmount);
    console.log(items);

    // Create a new order document
    const order = new Order({
      userId,
      items,
      address,
      totalAmount,
      paymentMethod: "COD", // Payment method can be made dynamic if needed
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart after placing the order
    await Cart.deleteOne({ userId });

    res
      .status(201)
      .json({ message: "Order placed successfully from cart", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to get all orders placed by a specific user (with pagination)
 */
exports.getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.body;
    // Get page and limit from query params, default page=1, limit=5
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Count total orders for pagination
    const total = await Order.countDocuments({ userId: Number(userId) });

    // Find orders for the given user, paginated and sorted by createdAt desc
    const orders = await Order.find({ userId: Number(userId) })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json({
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to get a specific order by its ID
 */
exports.getOrderById = async (req, res) => {
  try {
    // Extract orderId from request body
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Find the order by its ID and populate product details
    const order = await Order.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Controller to get all orders in the database
 */
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders and populate product details
    const allOrders = await Order.find().populate("items.product");

    if (!allOrders.length) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.json({ allOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
