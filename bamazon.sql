DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(25),
    department_name VARCHAR(25),
    sale_price INT,
    stock_quantity INT,
    PRIMARY KEY (item_id)
    );
    
INSERT INTO products (product_name, department_name, sale_price, stock_quantity)
VALUES
	("Bronze Widget #1", "Bronze Widgets", 1.00, 100),
    ("Bronze Widget #2", "Bronze Widgets", 2.00, 50),
    ("Bronze Widget #3", "Bronze Widgets", 4.00, 25),
    ("Silver Widget #1", "Silver Widgets", 10.00, 100),
    ("Silver Widget #2", "Silver Widgets", 20.00, 50),
    ("Silver Widget #3", "Silver Widgets", 40.00, 25),
    ("Gold Widget #1", "Gold Widgets", 100.00, 100),
    ("Gold Widget #2", "Gold Widgets", 200.00, 50),
    ("Gold Widget #3", "Gold Widgets", 400.00, 25),
    ("Platinum Widget #1", "Platinum Widgets", 1000.00, 100),
	("Platinum Widget #2", "Platinum Widgets", 2000.00, 50),
    ("Platinum Widget #3", "Platinum Widgets", 4000.00, 25);
    
       
SELECT * FROM products;
    
