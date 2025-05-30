const mongoose = require("mongoose");

// Define schema for Order collection
const orderSchema = new mongoose.Schema(
  {
    // ID of the user who placed the order
    userId: {
      type: Number,
      required: true,
    },

    // Array of ordered items
    items: [
      {
        // Reference to the product (linked to Product collection)
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        // Quantity of this product ordered
        quantity: {
          type: Number,
          required: true,
        },
        // Price of the product at the time of order
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    // Shipping address details for the order
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // Total amount for the order (sum of price * quantity for all items)
    totalAmount: { type: Number, required: true },

    // Payment method used for the order
    paymentMethod: {
      type: String,
      enum: ["COD"], // Currently only 'Cash on Delivery' supported
      default: "COD",
    },

    // Current payment status of the order
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    // Current delivery status of the order
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    collection: "orders", // Explicitly set collection name
    timestamps: true,     // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Order", orderSchema);
