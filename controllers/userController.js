const userModel = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const result = await userModel.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// gets user by email/password
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// gets user by id
exports.getUserById = async (req, res) => {
    try {
      const user = await userModel.getUserById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // deletes user
  exports.deleteUser = async (req, res) => {
    try {
      const result = await userModel.deleteUser(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const result = await userModel.updateUser(req.params.id, req.body);
      res.json({ message: 'User updated', changes: result.updated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  