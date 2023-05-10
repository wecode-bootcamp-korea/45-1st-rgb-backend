-- migrate:up
CREATE TABLE products_images (
id INT PRIMARY KEY,
image_url VARCHAR(255),
products_id INT,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE products_images;