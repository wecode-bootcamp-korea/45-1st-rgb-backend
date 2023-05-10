-- migrate:up
ALTER TABLE carts ADD CONSTRAINT unique_user_product1 UNIQUE (users_id, products_id);

-- migrate:down

