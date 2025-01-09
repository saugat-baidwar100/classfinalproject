/*
  Warnings:

  - Added the required column `role` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `role` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `role` DROP DEFAULT;
