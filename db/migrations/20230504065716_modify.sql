-- migrate:up
ALTER TABLE address MODIFY COLUMN postalcode VARCHAR(250);
ALTER TABLE users MODIFY COLUMN cellphone VARCHAR(250);
ALTER TABLE users MODIFY COLUMN is_active BOOLEAN DEFAULT 0;
ALTER TABLE users MODIFY COLUMN subscription BOOLEAN DEFAULT 0;
-- migrate:down

DROP TABLE modify_first;