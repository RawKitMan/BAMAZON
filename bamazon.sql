DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price DOUBLE (10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 400.00, 10), ("Hoodie", "Clothing", 20.00, 6),
("Boomstick", "Sporting Goods", 109.95, 1), ("4K TV", "Electronics", 1500.00, 3),("Bra", "Clothing", 39.95, 700),
("Baseball Bat", "Sporting Goods", 12.00, 150),("Pepsi", "Grocery", 5.50, 20),("Hammer", "Hardware", 10.25, 6),
("Klondike", "Grocery", 6.75, 30),("Hobbes", "Toy", 25.32, 15);

SELECT * FROM products;
