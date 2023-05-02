-- migrate:up
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kind VARCHAR(250)
);

-- migrate:down
DROP TABLE categories;
