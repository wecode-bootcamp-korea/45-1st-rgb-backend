-- migrate:up
ALTER TABLE order_items MODIFY COLUMN id INT AUTO_INCREMENT;

-- migrate:down

