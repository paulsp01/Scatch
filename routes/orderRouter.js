const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { isLoggedin } = require("../middlwares/isLoggedin");

// Route for placing an order
// router.post("/place",isLoggedin,  orderController.placeOrder);
// router.post('/order',isLoggedin,orderController.order);

router.post("/order-placed",isLoggedin, orderController.placeOrder);

module.exports = router;
