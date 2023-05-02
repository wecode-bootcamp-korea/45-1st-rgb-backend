-- migrate:up
CREATE TABLE cart (
    users_id INT NOT NULL,
    products_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (products_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE cart;
