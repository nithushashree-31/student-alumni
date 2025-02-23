import { ApplicationStatus, MeterSize, PropertyType } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateWaterServiceDto {
  @IsEnum(PropertyType)
  @IsNotEmpty()
  propertyType: PropertyType;

  @IsEnum(ApplicationStatus)
  @IsNotEmpty()
  applicationStatus: ApplicationStatus;

  @IsEmpty()
  appNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lotNo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  houseNo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  street: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nearestCrossroad: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  ownerTel: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  addressLine1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  suburb: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  state: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  builderCompanyName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  builderContact: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  builderTel: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  builderEmail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lhsNo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  rhsNo: string;

  @IsEnum(MeterSize)
  @IsNotEmpty()
  meterSize: MeterSize;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  flowRate: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  minPressureRequired: number;

  @IsBoolean()
  buildingPlanSubmitted: boolean;
}
