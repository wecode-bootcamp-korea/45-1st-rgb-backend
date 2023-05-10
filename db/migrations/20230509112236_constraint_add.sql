-- migrate:up
ALTER TABLE orders ADD CONSTRAINT fk_orders_carts_id FOREIGN KEY (carts_id) REFERENCES carts (id),
ADD CONSTRAINT fk_orders_users_id FOREIGN KEY (users_id) REFERENCES users (id),
ADD CONSTRAINT fk_orders_order_status_id FOREIGN KEY (order_status_id) REFERENCES order_status (id);

ALTER TABLE products_images ADD FOREIGN KEY (products_id) REFERENCES products(id);

ALTER TABLE order_items ADD FOREIGN KEY (products_id) REFERENCES products(id),
ADD FOREIGN KEY (orders_id) REFERENCES orders(id);


-- migrate:down

