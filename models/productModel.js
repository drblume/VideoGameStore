const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/store.db');

// ✅ Get all products from the database
function getAllProducts() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// ✅ Get product by ID
function getProductById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// ✅ Search products
function searchProducts({ name, category_id }) {
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
}

// ✅ Add new product
function addProduct({ name, description, image_url, price, category_id, featured = 0 }) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO products (name, description, image_url, price, category_id, featured)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [name, description, image_url, price, category_id, featured], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
}

// ✅ Edit existing product
function editProduct(id, updates) {
  const { name, description, image_url, price, category_id, condition, featured = 0 } = updates;
  return new Promise((resolve, reject) => {
    const query = `UPDATE products
                   SET name = ?, description = ?, image_url = ?, price = ?, category_id = ?, condition = ?, featured = ?
                   WHERE id = ?`;
    db.run(query, [name, description, image_url, price, category_id, condition, featured, id], function (err) {
      if (err) reject(err);
      else resolve({ updated: this.changes });
    });
  });
}

// ✅ Delete product
function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes });
    });
  });
}

// ✅ Bulk upload
function bulkUpload(products) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO Products (name, description, image_url, price, category_id, condition, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const getCategoryIdStmt = db.prepare(`SELECT id FROM Categories WHERE name = ?`);
      let inserted = 0;

      for (const p of products) {
        const categoryRow = getCategoryIdStmt.get(p.category);

        if (!categoryRow) {
          throw new Error(`Category "${p.category}" not found in database.`);
        }

        stmt.run(
          p.name,
          p.description,
          p.image_url,
          p.price,
          categoryRow.id,
          p.condition,
          p.featured || 0
        );

        inserted++;
      }

      resolve({ inserted });
    } catch (err) {
      reject(err);
    }
  });
}

// ✅ Export all functions
module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  addProduct,
  editProduct,
  deleteProduct,
  bulkUpload
};
