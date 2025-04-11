CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    user_type TEXT NOT NULL CHECK (user_type IN ('admin', 'shopper'))
);

CREATE TABLE Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    priority INTEGER DEFAULT 0
);

CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    price REAL NOT NULL,
    category_id INTEGER NOT NULL,
    featured BOOLEAN DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

CREATE TABLE Carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL CHECK (status IN ('new', 'abandoned', 'purchased')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE CartProducts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES Carts(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);