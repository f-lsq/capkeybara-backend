-- Sample INSERT Statements for Capkeybara
---------------------------------------------------------------------------------------------------------
-- Switching database
use capkeybara;

-- Inserting into Products table
INSERT INTO products (name, description, price, cost, quantity, category_id) VALUES 
("Keychron K6 Pro Pre-Built", "Compact 65% layout to maximize your work space.", 169.00, 100.00, 4, 1),
("Akko V3 Lavender Purple Pro", "Sold in packs of 10 switches (1 qty = 10 switches)", 4.00, 0.70, 28, 2),
("Mahjong Keycap Set", "108 keys, Compatible with 60%, TKL and 100% layouts only", 59.00, 20.00, 17, 3);

-- Inserting into Categories table
INSERT INTO categories (name, description) VALUES 
("Keyboards", "Prebuilt or barebone"),
("Switches", "Linear, Tactile, Clicky or Silent"),
("Keycaps", ""),
("Accessories", "Miscellanous items");