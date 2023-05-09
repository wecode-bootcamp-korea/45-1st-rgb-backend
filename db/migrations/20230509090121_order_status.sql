-- migrate:up
CREATE TABLE order_status (
id INT PRIMARY KEY,
status VARCHAR(100)
);

-- migrate:down
DROP TABLE order_status;