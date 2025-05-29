const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    collection: "carts",
  }
);

module.exports=mongoose.model('Cart',cartSchema)