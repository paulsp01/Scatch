const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

module.exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, totalAmount } = req.body;

    
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Products are required!" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required!" });
    }

   
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

   
    const productsDetails = await Promise.all(
      products.map(async (item) => {
        const product = await productModel.findById(item.product).select("name price discount");
        
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found!`);
        }

        return {
          product: product._id,
          quantity: parseInt(item.quantity, 10),
          itemsPrice: parseFloat(item.price).toFixed(2),
         
        };
      })
    );

   
    const totalPrice = parseFloat(totalAmount).toFixed(2);

    
    const order = await orderModel.create({
      user: req.user._id,
      products: productsDetails,
      totalPrice,
      shippingAddress,
      paymentStatus: "Completed",
      orderedAt: new Date(),
    });

    
    await userModel.findByIdAndUpdate(req.user._id, {
      $set: { cart: [] },
      $push: { orders: order._id },
    });

    
    const populatedOrder = await orderModel.findById(order._id).populate({
      path: "products.product",
      select: "name price description discount",
    });

    
    res.status(201).json({
      message: "Order placed successfully!",
      order: populatedOrder,
    });
  } catch (err) {
    console.error("Error placing order:", err.message);
    res.status(500).json({ message: err.message });
  }
};
