-- migrate:up
ALTER TABLE orders ADD cart_id INT NOT NULL
ALTER TABLE orders MODIFY cart_id INT
ALTER TABLE orders MODIFY cart_id INT NOT NULL
ALTER TABLE orders ADD CONSTRAINT fk_orders_cart FOREIGN KEY (cart_id) REFERENCES cart(id);

-- migrate:down

