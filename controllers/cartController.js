const User = require('../models/userModel'); 

module.exports.cart = async (req, res) => {
    const productId = req.params.id; 

    
    const userId = req.user._id; 

    try {
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        
        const itemIndex = user.cart.findIndex(item => item._id.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).send('Item not found in cart');
        }

       
        user.cart.splice(itemIndex, 1);

        
        await user.save();

       
        res.redirect('/cart'); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Failed to update cart');
    }
};
