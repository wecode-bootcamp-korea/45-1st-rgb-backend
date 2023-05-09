-- migrate:up
ALTER TABLE cart DROP FOREIGN KEY cart_ibfk_1
ALTER TABLE cart DROP FOREIGN KEY cart_ibfk_2
ALTER TABLE cart DROP CONSTRAINT products_id
ALTER TABLE cart DROP CONSTRAINT products_id_2
ALTER TABLE cart DROP CONSTRAINT users_id

ALTER TABLE cart ADD FOREIGN KEY (users_id) REFERENCES users(id)

ALTER TABLE cart ADD FOREIGN KEY (products_id) REFERENCES products(id)

ALTER TABLE cart ADD UNIQUE (users_id,products_id)

-- migrate:down

