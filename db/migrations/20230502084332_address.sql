-- migrate:up
CREATE TABLE address (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    address_info VARCHAR(500),
    postalcode INT(10),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE address;
