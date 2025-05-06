import React from 'react';
import '../styles/styles.css';

export default function AdminPage() {
  return (
    <>
      <header>
        <h1>Cartridge Classics Admin Panel</h1>
        <nav>
          <ul>
            <li><a href="/admin">Bulk Upload</a></li>
            <li><a href="/admin-products">Product Listing</a></li>
            <li><a href="/signin">Sign Out</a></li>
            <li><a href="/">Back to Home Page</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Bulk Product Upload</h2>
        <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          <label htmlFor="file-upload">Select a file to upload:</label>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            accept=".json,.csv,.txt"
          />
          <button type="submit">Upload</button>
        </form>

        <section className="instructions">
          <h3>Instructions</h3>
          <p>
            Please upload a file in JSON, CSV, or TXT format. The file should contain product data in the following
            format:
          </p>
          <pre>
{`{
  "products": [
    {
      "id": "1",
      "name": "Pokemon Emerald",
      "description": "Relive your childhood and purchase a hardly used copy of Pokemon Emerald for Gameboy Advance",
      "category": "Gameboy Advance",
      "image": "images/emeraldGreen.jpg",
      "price": "18.99",
      "condition": "Lightly Used"
    },
    {
      "id": "2",
      "name": "Super Mario 64",
      "description": "Classic platformer game for the Nintendo 64",
      "category": "Nintendo 64",
      "image": "images/mario64.jpg",
      "price": "29.99",
      "condition": "Good"
    }
  ]
}`}
          </pre>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Cartridge Classics. All rights reserved.</p>
      </footer>
    </>
  );
}
