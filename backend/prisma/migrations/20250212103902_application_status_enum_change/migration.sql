/*
  Warnings:

  - The values [Application_Under_Review] on the enum `WaterService_applicationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `waterservice` MODIFY `applicationStatus` ENUM('APPLICATION_UNDER_REVIEW', 'APPLICATION_SUBMITTED') NOT NULL;
