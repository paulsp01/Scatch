const Product = require('../models/productModel'); // Assuming you have a Product model

module.exports.shopfilter = async (req, res) => {
    const sortBy = req.query.sortby || 'popular';  // Sort option: 'popular' or 'newest'
    const category = req.query.category || 'all';  // Category filter: 'new', 'all', 'discounted'

    try {
        let query = {};

        if (category === 'new') {
            query = { createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) } };  // Show products added within the last 30 days
        } else if (category === 'discounted') {
            query = { discount: { $gt: 0 } };  // Show products with a discount
        }

        let products = await Product.find(query);
        let success=req.flash("success");

        // Sort products based on the 'sortby' query parameter
        if (sortBy === 'newest') {
            products = products.sort((a, b) => b.createdAt - a.createdAt);
        } else if (sortBy === 'popular') {
            products = products.sort((a, b) => b.sales - a.sales);  // Assuming you have a 'sales' field
        }

        res.render('shop', { products,success });  // Render the products on the shop page
    } catch (err) {
        res.status(500).send('Error fetching products');
    }
};
