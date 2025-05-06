// server.js
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, 'data/store.db'));
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); 

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); 

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// PRODUCTS
app.get('/api/products', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = stmt.get(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const { name, price, description, image_url, system, condition } = req.body;
    const stmt = db.prepare('INSERT INTO products (name, price, description, image_url, system, condition) VALUES (?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, price, description, image_url, system, condition);
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const { name, price, description, image_url, system, condition } = req.body;
    const stmt = db.prepare('UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, system = ?, condition = ? WHERE id = ?');
    const result = stmt.run(name, price, description, image_url, system, condition, req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// USERS
app.get('/api/users', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users', (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const stmt = db.prepare('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)');
    const result = stmt.run(username, password, isAdmin);
    res.status(201).json({ id: result.lastInsertRowid, username, isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const stmt = db.prepare('UPDATE users SET username = ?, password = ?, isAdmin = ? WHERE id = ?');
    const result = stmt.run(username, password, isAdmin, req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ id: req.params.id, username, isAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
    const user = stmt.get(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ id: user.id, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// CART
app.get('/api/cart/:userId', (req, res) => {
  try {
    const userId = req.params.userId;

    const stmt = db.prepare(`
      SELECT cp.id, p.name, p.price, p.image_url, cp.quantity 
      FROM cartProducts cp
      JOIN products p ON cp.product_id = p.id
      JOIN carts c ON cp.cart_id = c.id
      WHERE c.user_id = ? AND c.status = 'new'
    `);
    
    const items = stmt.all(userId);
    res.json(items);
  } catch (err) {
    console.error('Error fetching cart from DB:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});


app.post('/api/carts', (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Get or create a cart
    const cartStmt = db.prepare("SELECT * FROM carts WHERE user_id = ? AND status = 'new'");
    let cart = cartStmt.get(userId);
    if (!cart) {
      const insertCart = db.prepare("INSERT INTO carts (user_id, status) VALUES (?, 'new')");
      const result = insertCart.run(userId);
      cart = { id: result.lastInsertRowid };
    }

    // Check for existing cart product
    const checkStmt = db.prepare('SELECT * FROM cartProducts WHERE product_id = ? AND quantity = ?');
    const existing = checkStmt.get(cart.id, productId); 

    if (existing) {
      const updateStmt = db.prepare('UPDATE cartProducts SET quantity = quantity + ? WHERE id = ?');
      updateStmt.run(quantity, existing.id);
    } else {
      const insertStmt = db.prepare('INSERT INTO cartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)');
      insertStmt.run(cart.id, productId, quantity);
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.put('/api/cart/:id', (req, res) => {
  try {
    const { quantity } = req.body;
    const stmt = db.prepare('UPDATE cart_products SET quantity = ? WHERE id = ?');
    const result = stmt.run(quantity, req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Quantity updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update quantity' });
  }
});

app.delete('/api/cart/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM cart_products WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

app.post('/api/cart/checkout', (req, res) => {
  try {
    const { userId } = req.body;

    // Find active cart for user
    const cartStmt = db.prepare("SELECT * FROM carts WHERE user_id = ? AND status = 'new'");
    const cart = cartStmt.get(userId);

    if (!cart) return res.status(404).json({ error: "No active cart found." });

    // Delete cart products
    const deleteStmt = db.prepare("DELETE FROM cartProducts WHERE cart_id = ?");
    deleteStmt.run(cart.id);

    // Optionally mark the cart as completed
    const updateCart = db.prepare("UPDATE carts SET status = 'purchased' WHERE id = ?");
    updateCart.run(cart.id);

    res.json({ message: "Checkout successful. Cart emptied." });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Failed to checkout." });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});