-- migrate:up
CREATE TABLE carts (
id INT NOT NULL PRIMARY KEY,
users_id INT NOT NULL,
products_id INT NOT NULL,
quantity INT NOT NULL
);

-- migrate:down
DROP TABLE carts;