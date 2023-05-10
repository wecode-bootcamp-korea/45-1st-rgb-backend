-- migrate:up
CREATE TABLE products (
id INT PRIMARY KEY,
categories_id INT,
artist_name VARCHAR(255) NOT NULL,
title VARCHAR(255) NOT NULL,
description VARCHAR(500) NOT NULL,
products_size_left INT(12) NOT NULL,
products_size_right INT(12) NOT NULL,
price DECIMAL(12,2) NOT NULL,
material VARCHAR(300),
quantity INT NOT NULL,
max_quantity INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE products;