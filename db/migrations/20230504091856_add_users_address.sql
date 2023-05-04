-- migrate:up
ALTER TABLE users DROP address_id;
ALTER TABLE users ADD address VARCHAR(255) NULL AFTER profile_image_url;
ALTER TABLE users ADD postalcode VARCHAR(255) NULL AFTER address;
-- migrate:down

