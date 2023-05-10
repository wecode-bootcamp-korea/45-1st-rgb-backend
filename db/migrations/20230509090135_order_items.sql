-- migrate:up
CREATE TABLE order_items (
id INT PRIMARY KEY,
products_id INT NOT NULL,
orders_id INT,
quantity INT
);

-- migrate:down
DROP TABLE order_items;