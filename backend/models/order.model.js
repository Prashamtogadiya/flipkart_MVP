const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
      type: Number,
      required: true,
    },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["COD"],
    default: "COD",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
},{
    collection:"orders",
    timestamps:true
});

module.exports = mongoose.model('Order',orderSchema)
