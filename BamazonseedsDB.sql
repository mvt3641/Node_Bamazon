
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(20),
  department_name VARCHAR(30),
  price INT(10),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

-- Creates new rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Tolietries",3,8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spoon","Kitchen",2,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea", "Grocery",4,6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pen", "Office",2,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chicken", "Food",4,13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desk", "Office",53,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blanket", "Home",2,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Mug", "Kitchen",2,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics",100,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Shoes", "Outdoors",15,10);
