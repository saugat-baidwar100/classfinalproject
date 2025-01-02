/*
  Warnings:

  - Added the required column `thumbnail` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL;
