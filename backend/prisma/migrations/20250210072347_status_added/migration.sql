/*
  Warnings:

  - Added the required column `applicationStatus` to the `WaterService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `waterservice` ADD COLUMN `applicationStatus` ENUM('Application_Under_Review') NOT NULL;
