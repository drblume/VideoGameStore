const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/store.db');

// Get all products
exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Get product by ID
exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Search products by name and category_id
exports.searchProducts = ({ name, category_id }) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }

    if (category_id) {
      query += ' AND category_id = ?';
      params.push(category_id);
    }

    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Add new product
exports.addProduct = ({ name, description, image_url, price, category_id, featured = 0 }) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO products (name, description, image_url, price, category_id, featured)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [name, description, image_url, price, category_id, featured], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

// Edit existing product
exports.editProduct = (id, updates) => {
  const { name, description, image_url, price, category_id, featured = 0 } = updates;
  return new Promise((resolve, reject) => {
    const query = `UPDATE products
                   SET name = ?, description = ?, image_url = ?, price = ?, category_id = ?, featured = ?
                   WHERE id = ?`;
    db.run(query, [name, description, image_url, price, category_id, featured, id], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
};

// Bulk upload products
exports.bulkUpload = (products) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO products (name, description, image_url, price, category_id, featured)
                             VALUES (?, ?, ?, ?, ?, ?)`);
    try {
      for (const p of products) {
        stmt.run([p.name, p.description, p.image_url, p.price, p.category_id, p.featured || 0]);
      }
      stmt.finalize();
      resolve({ inserted: products.length });
    } catch (err) {
      reject(err);
    }
  });
};
