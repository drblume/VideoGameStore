const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/store.db');

exports.createUser = ({ name, email, password, user_type }) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, email, password, user_type], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, email, user_type FROM Users', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.updateUser = (id, updates) => {
    const { name, email, password, user_type } = updates;
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Users
        SET name = ?, email = ?, password = ?, user_type = ?
        WHERE id = ?
      `;
      db.run(query, [name, email, password, user_type, id], function (err) {
        if (err) reject(err);
        else resolve({ updated: this.changes });
      });
    });
  };

  exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Users WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve({ deleted: this.changes });
      });
    });
  };

  exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id, name, email, user_type FROM Users WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  };

  exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Users WHERE email = ?`, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  };
  