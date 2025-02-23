/*
  Warnings:

  - You are about to alter the column `propertyType` on the `waterservice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `waterservice` MODIFY `propertyType` ENUM('MULTI_RESIDENTIAL', 'NON_RESIDENTIAL') NOT NULL;
