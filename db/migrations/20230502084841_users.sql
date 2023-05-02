-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscription BOOLEAN,
    password VARCHAR(300) NOT NULL,
    first_name VARCHAR(200), 
    last_name VARCHAR(200),
    profile_image_url VARCHAR(255),
    cellphone INT(30),
    address_id INT,
    sex VARCHAR(10), 
    points DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN,
    deleted_at TIMESTAMP,
    FOREIGN KEY (address_id) REFERENCES address(id)
);

-- migrate:down
DROP TABLE users;
