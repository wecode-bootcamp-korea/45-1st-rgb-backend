-- migrate:up
ALTER TABLE cart ALTER COLUMN quantity SEt DEFAULT 1;
-- migrate:down

