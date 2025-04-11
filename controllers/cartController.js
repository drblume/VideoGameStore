const cartModel = require('../models/cartModel');
const USER_ID = 1; // Placeholder user ID for now

exports.getCart = async (req, res) => {
  try {
    const cart = await cartModel.getCartByUserId(USER_ID);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const result = await cartModel.addToCart({ user_id: USER_ID, product_id, quantity });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.body;
    const result = await cartModel.removeFromCart({ user_id: USER_ID, product_id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkoutCart = async (req, res) => {
  try {
    const result = await cartModel.checkoutCart(USER_ID);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
