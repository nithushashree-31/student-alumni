/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `role` ENUM('ADMIN', 'DSP', 'MAP', 'DTL', 'FINANCE', 'CUSTOMER_SERVICE', 'OPERATIONS_TEAM', 'LAND_DEVELOPER') NOT NULL;
