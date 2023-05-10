-- migrate:up
ALTER TABLE orders DROP FOREIGN KEY fk_orders_users_id;
ALTER TABLE users MODIFY id INT NOT NULL AUTO_INCREMENT;

-- migrate:down
ALTER TABLE users MODIFY id INT NOT NULL;
ALTER TABLE orders ADD CONSTRAINT fk_orders_users_id FOREIGN KEY (users_id) REFERENCES users (id);
