-- migrate:up
CREATE TABLE order_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_status VARCHAR(100)
);

-- migrate:down
DROP TABLE order_status;
