const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, 
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true, 
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, 
        default: 1,
      },
      itemsPrice:Number,
      
    },
  ],
  totalPrice: {
    type: Number,
    required: true, 
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
    required: true, 
  },
  orderedAt: {
    type: Date,
  },
  shippingAddress: {
    type: String,
    required: true, 
  },
});

module.exports = mongoose.model("order", orderSchema);
