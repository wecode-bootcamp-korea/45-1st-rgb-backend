-- migrate:up
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  subscription BOOLEAN DEFAULT 0,
  password VARCHAR(300) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_image_url VARCHAR(255),
  address VARCHAR(400),
  postalcode VARCHAR(200),
  cellphone VARCHAR(250),
  sex VARCHAR(100),
  points DECIMAL(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  deactive BOOLEAN DEFAULT 0
);

-- migrate:down
DROP TABLE users;
