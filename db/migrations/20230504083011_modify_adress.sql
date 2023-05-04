-- migrate:up
ALTER TABLE users DROP FOREIGN KEY users_ibfk_1
DROP TABLE address


-- migrate:down

