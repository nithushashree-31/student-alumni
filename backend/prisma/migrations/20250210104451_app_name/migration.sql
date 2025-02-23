/*
  Warnings:

  - Added the required column `appNumber` to the `WaterService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `waterservice` ADD COLUMN `appNumber` VARCHAR(50) NOT NULL;
