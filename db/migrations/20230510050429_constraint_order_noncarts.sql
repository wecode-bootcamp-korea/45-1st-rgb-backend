-- migrate:up
ALTER TABLE orders DROP COLUMN carts_id;

-- migrate:down

