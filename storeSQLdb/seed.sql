INSERT INTO Categories (name, priority) VALUES
('Consoles', 1),
('Games', 2),
('Accessories', 3);

-- Products
INSERT INTO products (name, description, image_url, price, category_id, featured) VALUES
('Pokemon Emerald Green', 'Classic GBA adventure in the Hoenn region.', 'images/emeraldGreen.jpg', 18.99, 1, 0),
('Super Smash Bros', 'The iconic Nintendo crossover fighting game.', 'images/superSmash.jpg', 43.99, 1, 0),
('Super Mario 64', '3D platformer legend on the N64.', 'images/mario64.jpg', 59.99, 1, 1),
('Crash Bandicoot', 'Sony’s original spin-happy mascot platformer.', 'images/crash.jpg', 19.99, 1, 0),
('Sonic the Hedgehog', 'Gotta go fast! Classic SEGA speedster.', 'images/sonic.jpg', 12.99, 1, 0);

-- Users
INSERT INTO Users (name, email, password, user_type) VALUES
('Ash Ketchum', 'ash@example.com', 'pikachu123', 'shopper'),
('Mario Mario', 'mario@example.com', 'itsame', 'shopper'),
('Lara Croft', 'lara@example.com', 'tombraider', 'shopper');

-- Carts (new = active, purchased = checked out)
INSERT INTO Carts (user_id, status) VALUES
(1, 'new'),        -- Ash's cart
(2, 'purchased'),  -- Mario's previous order
(3, 'new');        -- Lara's active cart

-- CartProducts (cart_id, product_id, quantity)
-- Assuming product IDs 1–3 exist
INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES
(1, 1, 2),  -- Ash: 2 of product 1
(1, 2, 1),  -- Ash: 1 of product 2
(2, 3, 1),  -- Mario: 1 of product 3
(3, 2, 3);  -- Lara: 3 of product 2


SELECT * FROM Products
