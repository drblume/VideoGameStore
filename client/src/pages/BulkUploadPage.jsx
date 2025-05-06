// src/pages/BulkUploadPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BulkUploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    try {
      const text = await file.text();
      const products = JSON.parse(text);

      const response = await fetch('http://localhost:5000/api/products/bulkUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(products)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Bulk upload failed');
      }

      setMessage('Bulk upload successful!');
      setError('');
    } catch (err) {
      console.error('Bulk upload error:', err);
      setError('Failed to upload. Make sure your file is valid and categories exist.');
      setMessage('');
    }
  };

  return (
    <div>
      <header>
        <h1>Bulk Upload Products</h1>
        <nav>
          <ul>
            <li><Link to="/admin">Bulk Upload</Link></li>
            <li><Link to="/admin-products">Product Listing</Link></li>
            <li><Link to="/">Back to Home Page</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <p>Upload a JSON file with an array of products:</p>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button onClick={handleUploadClick}>Upload</button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>

      <footer>
        <p>&copy; 2025 Cartridge Classics. All rights reserved.</p>
      </footer>
    </div>
  );
}
