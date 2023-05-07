-- migrate:up
ALTER TABLE cart ADD id INT AUTO_INCREMENT PRIMARY KEY FIRST ;


-- migrate:down

DROP TABLE cart_Id