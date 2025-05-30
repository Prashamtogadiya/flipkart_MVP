const Cart = require("../models/cart.model");
const Product = require("../models/productlist.model");

/**
 * Get the cart for a specific user
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Find the cart for the user and populate product details
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    // If no cart exists, return an empty cart
    if (!cart) {
      return res.json({ items: [] });
    }
    
    // Format the cart items to return essential product and quantity info
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

/**
 * Add a product to the user's cart
 */
exports.addToCart = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { productId, quantity } = req.body;

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check if cart already exists
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart, create a new one with the product
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If yes, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If not, add as new item
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update the quantity of a specific product in a user's cart.
 */
exports.updateCartItem = async (req, res) => {
  try {
    // Extract user ID from URL parameters and convert it to a number
    const userId = Number(req.params.userId);

    // Extract productId and the new quantity from the request body
    const { productId, quantity } = req.body;

    // Ensure the quantity is greater than 0
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than zero" });
    }

    // Find the cart associated with the given user ID
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the product in the cart's items array
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // If the product is not found in the cart, return an error
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not in cart" });
    }

    // Update the quantity of the product in the cart
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart back to the database
    await cart.save();

    // Respond with a success message
    res.json({ message: "Quantity updated" });
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({ error: err.message });
  }
};

/**
 * Remove a specific product from the user's cart.
 */
exports.removeCartItem = async (req, res) => {
  try {
    // Extract user ID from URL parameters and convert it to a number
    const userId = Number(req.params.userId);

    // Extract productId from the request body
    const { productId } = req.body;

    // Find the cart associated with the given user ID
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Filter out the item with the specified productId from the cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated cart back to the database
    await cart.save();

    // Respond with a success message
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({ error: err.message });
  }
};

/**
 * Clear the entire cart for a user
 */
exports.clearCart = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    // Delete the entire cart document for the user
    await Cart.findOneAndDelete({ userId });

    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
