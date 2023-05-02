-- migrate:up
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(120) NOT NULL,
    users_id INT NOT NULL,
    total_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    order_status_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE orders;
