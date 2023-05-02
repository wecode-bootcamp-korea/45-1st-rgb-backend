-- migrate:up
CREATE TABLE order_items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    products_id INT NOT NULL,
    orders_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (products_id) REFERENCES products(id),
    FOREIGN KEY (orders_id) REFERENCES orders(id)
);

-- migrate:down
DROP TABLE order_items;
