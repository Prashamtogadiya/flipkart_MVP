const Cart = require("../models/cart.model");
const Product = require("../models/productlist.model");

exports.getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      return res.json({ items: [] });
    }

    const responseItems = cart.items.map((item) => ({
      product: {
        _id: item.productId._id,
        name: item.productId.name,
        description: item.productId.description,
        price: item.productId.price,
        imageUrl: item.productId.imageUrl,
        category: item.productId.category,
      },
      quantity: item.quantity,
    }));

    res.json({ items: responseItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ message: "Cart Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quality must be greater than zero" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ error: "Product not in cart" });
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    await Cart.findOneAndDelete({ userId });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
