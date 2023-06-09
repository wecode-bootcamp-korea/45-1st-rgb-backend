-- migrate:up
CREATE TABLE orders (
id INT NOT NULL AUTO_INCREMENT,
carts_id INT NOT NULL,
users_id INT NOT NULL,
total_price INT,
uuid VARCHAR(255),
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
order_status_id INT,
PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE orders;