-- migrate:up
ALTER TABLE orders DROP FOREIGN KEY fk_orders_carts_id;
ALTER TABLE orders DROP COLUMN carts_id;

-- migrate:down

