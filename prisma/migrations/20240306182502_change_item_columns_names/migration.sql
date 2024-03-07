/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - Added the required column `item_name` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    ADD COLUMN `item_description` VARCHAR(191) NULL,
    ADD COLUMN `item_image` VARCHAR(191) NULL,
    ADD COLUMN `item_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `item_price` DOUBLE NULL;
