/*
  Warnings:

  - You are about to alter the column `meterSize` on the `waterservice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `waterservice` MODIFY `meterSize` ENUM('SIZE_20MM', 'SIZE_25MM', 'SIZE_40MM', 'SIZE_50MM', 'SIZE_80MM', 'SIZE_100MM', 'SIZE_150MM') NOT NULL;
