DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;





CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
PRIMARY KEY (item_id)

);
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('SK Lacrosse Stick', 'Athletics', 109.99, 500),
('STX Lacrosse Shaft', 'Athletics', 99.99, 250),
('Jordan Shoes', 'Athletics', 150.99, 200),
('Wilson Volleyball', 'Athletics', 29.99, 1000),
('Rabil5 Lacrosse Head', 'Athletics', 109.99, 350),
('UA Curry Shoes', 'Athletics', 139.99, 300),
('Brine f55 Shaft', 'Athletics', 121.99, 125),
('Nikola Jokic Jersey', 'Athletics', 109.99, 400),
('baseball bat', 'Athletics', 89.99, 125),
('baseball glove', 'Athletics', 69.99, 55);

DELETE t1 FROM products t1
INNER JOIN products t2
WHERE t1.item_id < t2.item_id AND t1.product_name = t2.product_name;







