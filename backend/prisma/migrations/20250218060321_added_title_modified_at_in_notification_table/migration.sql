/*
  Warnings:

  - Added the required column `modifiedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `modifiedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(20) NOT NULL,
    MODIFY `message` VARCHAR(50) NOT NULL;
