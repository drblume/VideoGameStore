INSERT INTO Categories (name, priority) VALUES
('Consoles', 1),
('Games', 2),
('Accessories', 3);

INSERT INTO products (name, description, image_url, price, category_id, featured) VALUES
('Pokemon Emerald Green', 'Classic GBA adventure in the Hoenn region.', 'images/emeraldGreen.jpg', 18.99, 1, 0),
('Super Smash Bros', 'The iconic Nintendo crossover fighting game.', 'images/superSmash.jpg', 43.99, 1, 0),
('Super Mario 64', '3D platformer legend on the N64.', 'images/mario64.jpg', 59.99, 1, 1),
('Crash Bandicoot', 'Sony’s original spin-happy mascot platformer.', 'images/crash.jpg', 19.99, 1, 0),
('Sonic the Hedgehog', 'Gotta go fast! Classic SEGA speedster.', 'images/sonic.jpg', 12.99, 1, 0);

SELECT * FROM Products
