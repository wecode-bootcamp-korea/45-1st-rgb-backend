-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categories_id INT NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    products_size_left INT(12) NOT NULL,
    products_size_right INT(12) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    material VARCHAR(250) NULL,
    quantity INT(10) NOT NULL,
    max_quantity INT(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categories_id) REFERENCES categories(id)
)

-- migrate:down
DROP TABLE products;
