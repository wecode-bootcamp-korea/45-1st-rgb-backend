-- migrate:up
CREATE TABLE categories (
id INT PRIMARY KEY AUTO_INCREMENT,
kind VARCHAR(255)
);

-- migrate:down
DROP TABLE categories;