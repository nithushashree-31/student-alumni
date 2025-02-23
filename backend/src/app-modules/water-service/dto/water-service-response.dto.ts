import { PropertyType, ApplicationStatus, MeterSize } from '@prisma/client';
export class WaterServiceResponseDto {
  id: number;
  appNumber: string;
  propertyType: PropertyType;
  lotNo: string;
  houseNo: string;
  street: string;
  nearestCrossroad: string;
  ownerName: string;
  ownerTel: string;
  addressLine1: string;
  suburb: string;
  postalCode: string;
  state: string;
  country: string;
  builderCompanyName: string;
  builderContact: string;
  builderTel: string;
  builderEmail: string;
  lhsNo: string;
  rhsNo: string;
  meterSize: MeterSize;
  flowRate: number;
  minPressureRequired: number;
  buildingPlanSubmitted: boolean;
  createdAt: Date;
  applicationStatus: ApplicationStatus;
}
