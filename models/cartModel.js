const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/store.db');

// Get all items currently in the user's active (new) cart
exports.getCartByUserId = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT cp.id, p.name, p.price, cp.quantity
      FROM CartProducts cp
      JOIN Products p ON cp.product_id = p.id
      JOIN Carts c ON cp.cart_id = c.id
      WHERE c.user_id = ? AND c.status = 'new'
    `;
    db.all(query, [user_id], (err, rows) => {
      if (err) {
        console.error("DB error:", err); // 👈 log it
        reject(err);
      } else {
        console.log("DB returned rows:", rows); // 👈 log it
        resolve(rows);
      }
    });
  });
};

// Add a product to the user's cart
exports.addToCart = ({ user_id, product_id, quantity }) => {
  return new Promise((resolve, reject) => {
    // check if the user already has an open cart
    db.get(`SELECT id FROM Carts WHERE user_id = ? AND status = 'new'`, [user_id], (err, cart) => {
      if (err) return reject(err);

      // function to insert the product once we have the cart ID
      const ensureCartId = (cart_id) => {
        db.run(
          `INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)`,
          [cart_id, product_id, quantity],
          function (err) {
            if (err) reject(err);
            else resolve({ added: this.lastID }); // Return the new CartProduct ID
          }
        );
      };

      // If a cart exists, use its ID
      if (cart) {
        ensureCartId(cart.id);
      } else {
        // If no cart exists, create one and then insert the product
        db.run(`INSERT INTO Carts (user_id, status) VALUES (?, 'new')`, [user_id], function (err) {
          if (err) return reject(err);
          ensureCartId(this.lastID); // Use the new cart ID
        });
      }
    });
  });
};

// Remove a product from the user's active cart
exports.removeFromCart = ({ user_id, product_id }) => {
  return new Promise((resolve, reject) => {
    // Get the active cart for the user
    db.get(`SELECT id FROM Carts WHERE user_id = ? AND status = 'new'`, [user_id], (err, cart) => {
      if (err || !cart) return reject(err || 'Cart not found');

      // Delete the matching product from that cart
      db.run(
        `DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?`,
        [cart.id, product_id],
        function (err) {
          if (err) reject(err);
          else resolve({ removed: this.changes }); // Return number of rows removed
        }
      );
    });
  });
};

// Checkout: mark the user's active cart as purchased
exports.checkoutCart = (user_id) => {
  return new Promise((resolve, reject) => {
    // Get the active cart
    db.get(`SELECT id FROM Carts WHERE user_id = ? AND status = 'new'`, [user_id], (err, cart) => {
      if (err || !cart) return reject(err || 'No active cart');

      // Update cart status to 'purchased'
      db.run(
        `UPDATE Carts SET status = 'purchased' WHERE id = ?`,
        [cart.id],
        function (err) {
          if (err) reject(err);
          else resolve({ success: true }); // Indicate success
        }
      );
    });
  });
};


