-- migrate:up
ALTER TABLE `orders` DROP FOREIGN KEY `fk_orders_carts_id`;
ALTER TABLE `orders` MODIFY COLUMN `carts_id` INT UNSIGNED NOT NULL;
ALTER TABLE `45_1st_project_rgb`.`carts` MODIFY COLUMN `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_carts_id` FOREIGN KEY (`carts_id`) REFERENCES `45_1st_project_rgb`.`carts` (`id`);
-- migrate:down
ALTER TABLE `orders` DROP FOREIGN KEY `fk_orders_carts_id`;
ALTER TABLE `45_1st_project_rgb`.`carts` MODIFY COLUMN `id` INT NOT NULL;
ALTER TABLE `orders` MODIFY COLUMN `carts_id` INT NOT NULL;
ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_carts_id` FOREIGN KEY (`carts_id`) REFERENCES `45_1st_project_rgb`.`carts` (`id`);






