-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('MULTI_RESIDENTIAL', 'NON_RESIDENTIAL');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLICATION_UNDER_REVIEW', 'APPLICATION_SUBMITTED');

-- CreateEnum
CREATE TYPE "MeterSize" AS ENUM ('SIZE_20MM', 'SIZE_25MM', 'SIZE_40MM', 'SIZE_50MM', 'SIZE_80MM', 'SIZE_100MM', 'SIZE_150MM');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DSP', 'MAP', 'DTL', 'FINANCE', 'CUSTOMER_SERVICE', 'OPERATIONS_TEAM', 'LAND_DEVELOPER');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "mfaOtp" INTEGER,
    "mfaOtpStartTime" TIMESTAMP(3),
    "role" "Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" INTEGER,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "WaterService" (
    "id" SERIAL NOT NULL,
    "appNumber" VARCHAR(50) NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "lotNo" VARCHAR(50) NOT NULL,
    "houseNo" VARCHAR(50) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "nearestCrossroad" VARCHAR(100) NOT NULL,
    "ownerName" VARCHAR(100) NOT NULL,
    "ownerTel" VARCHAR(20) NOT NULL,
    "addressLine1" VARCHAR(200) NOT NULL,
    "suburb" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "builderCompanyName" VARCHAR(100) NOT NULL,
    "builderContact" VARCHAR(100) NOT NULL,
    "builderTel" VARCHAR(20) NOT NULL,
    "builderEmail" VARCHAR(100) NOT NULL,
    "lhsNo" VARCHAR(50) NOT NULL,
    "rhsNo" VARCHAR(50) NOT NULL,
    "meterSize" "MeterSize" NOT NULL,
    "flowRate" DOUBLE PRECISION NOT NULL,
    "minPressureRequired" DOUBLE PRECISION NOT NULL,
    "buildingPlanSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "applicationStatus" "ApplicationStatus" NOT NULL,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedBy" INTEGER,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WaterService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "receiverUserId" INTEGER NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "message" VARCHAR(50) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
