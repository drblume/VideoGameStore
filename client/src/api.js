import axios from 'axios';

const API_BASE = 'http://localhost:5000';

// Product API functions
export async function getAllProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
}


export const getProductById = async (id) => {
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
};

export async function searchProducts(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/products/search?${query}`);

  if (!response.ok) {
    throw new Error('Failed to search products');
  }

  return await response.json();
}

export async function addProduct(productData) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    throw new Error('Failed to add product');
  }

  return await response.json();
}

export async function editProduct(id, updates) {
  const response = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }

  return await response.json();
}

export async function bulkUpload(products) {
  const response = await axios.post('/api/products/bulkUpload', products);
  return response.data;
}

// Cart API functions
export async function getCart(userId) {
  const id = userId || localStorage.getItem('userId');
  if (!id) throw new Error("User ID not found in localStorage");

  const response = await axios.get(`/api/cart/${id}`);
  return response.data;
}

export const addToCart = async ({ userId, productId, quantity }) => {
  const response = await axios.post(`${API_BASE}/api/cart`, {
    userId,
    productId,
    quantity
  });
  return response.data;
};

export const removeFromCart = async (product_id) => {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error("User ID not found in localStorage");

  const res = await axios.delete(`${API_BASE}/cart`, { 
    data: { userId, productId: product_id }
  });
  return res.data;
};

export const checkoutCart = async (userId) => {
  const res = await axios.post('/api/cart/checkout', { userId });
  return res.data;
};

// User API functions
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/users/login`, { email, password });
  return res.data;
};

export async function createUser({ username, password, isAdmin }) {
  const res = await axios.post('http://localhost:5000/api/users', {
    username,
    password,
    isAdmin,
  });
  return res.data;
}



export const getUserById = async (id) => {
  const res = await axios.get(`${API_BASE}/users/${id}`);
  return res.data;
};

// Error handling wrapper
export const apiRequest = async (requestFn) => {
  try {
    return await requestFn();
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // The request was made and the server responded with an error status
      console.error('API Error Response:', error.response.data);
      throw new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
      throw new Error('No response from server');
    } else {
      // Something else happened while setting up the request
      console.error('API Request Error:', error.message);
      throw error;
    }
  }
};

export async function updateCartItem(productId, quantity) {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error("User ID not found in localStorage");

  const res = await axios.put(`${API_BASE}/cart/${productId}`, {
    userId,
    quantity
  });

  return res.data;
}

