/*
  Warnings:

  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `phone`;

-- CreateTable
CREATE TABLE `WaterService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyType` VARCHAR(50) NOT NULL,
    `lotNo` VARCHAR(50) NOT NULL,
    `houseNo` VARCHAR(50) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `nearestCrossroad` VARCHAR(100) NOT NULL,
    `ownerName` VARCHAR(100) NOT NULL,
    `ownerTel` VARCHAR(20) NOT NULL,
    `addressLine1` VARCHAR(200) NOT NULL,
    `suburb` VARCHAR(100) NOT NULL,
    `postalCode` VARCHAR(20) NOT NULL,
    `state` VARCHAR(50) NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `builderCompanyName` VARCHAR(100) NOT NULL,
    `builderContact` VARCHAR(100) NOT NULL,
    `builderTel` VARCHAR(20) NOT NULL,
    `builderEmail` VARCHAR(100) NOT NULL,
    `lhsNo` VARCHAR(50) NOT NULL,
    `rhsNo` VARCHAR(50) NOT NULL,
    `meterSize` VARCHAR(50) NOT NULL,
    `flowRate` DOUBLE NOT NULL,
    `minPressureRequired` DOUBLE NOT NULL,
    `buildingPlanSubmitted` BOOLEAN NOT NULL DEFAULT false,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedBy` INTEGER NULL,
    `modifiedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
