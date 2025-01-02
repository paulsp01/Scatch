const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userDetails: {
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
          required: true
         },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
  },
  productDetails: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product', 
        required: true
     },
      productName: { 
        type: String, 
        required: true 
    },
      quantity: { 
        type: Number, 
        required: true
     },
      price: { 
        type: Number, 
        required: true 
    },
    },
  ],
  paymentDetails: {
    paymentMethod: { 
        type: String, 
        enum: ['Credit Card', 'Debit Card', 'UPI', 'PayPal'], 
        required: true
     },
    transactionId: { 
        type: String, 
        unique: true, 
        required: true
     },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], 
        required: true },
    paymentDate: { 
        type: Date, 
        default: Date.now
     },
  },
  createdAt: { 
    type: Date, 
    default: Date.now
 },
});

module.exports = mongoose.model('payment', paymentSchema);
