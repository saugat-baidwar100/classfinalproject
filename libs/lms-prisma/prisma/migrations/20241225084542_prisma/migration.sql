/*
  Warnings:

  - You are about to drop the column `level` on the `courses` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `content_type` VARCHAR(191) NOT NULL DEFAULT 'text',
    ADD COLUMN `content_url` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `level`,
    ADD COLUMN `instructor` VARCHAR(191) NOT NULL DEFAULT 'TBD',
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'general',
    MODIFY `price` DOUBLE NOT NULL;
