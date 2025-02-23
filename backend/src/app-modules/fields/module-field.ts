import { FieldDto } from './field.dto';
import { FieldDataType } from './field.dto';

const allFields: { [key: string]: FieldDto[] } = {
  waterService: [
    new FieldDto('id', 'S.No', FieldDataType.NUMBER),
    new FieldDto('appNumber', 'Application Number', FieldDataType.STRING),
    new FieldDto('propertyType', 'Application Type', FieldDataType.ENUM),
    new FieldDto('lotNo', 'Lot Number', FieldDataType.STRING),
    new FieldDto('houseNo', 'House Number', FieldDataType.STRING),
    new FieldDto('street', 'Street', FieldDataType.STRING),
    new FieldDto('nearestCrossroad', 'Nearest Crossroad', FieldDataType.STRING),
    new FieldDto('ownerName', 'Owner Name', FieldDataType.STRING),
    new FieldDto('ownerTel', 'Owner Telephone', FieldDataType.STRING),
    new FieldDto('addressLine1', 'Address Line 1', FieldDataType.STRING),
    new FieldDto('suburb', 'Suburb', FieldDataType.STRING),
    new FieldDto('postalCode', 'Postal Code', FieldDataType.STRING),
    new FieldDto('state', 'State', FieldDataType.STRING),
    new FieldDto('country', 'Country', FieldDataType.STRING),
    new FieldDto(
      'builderCompanyName',
      'Builder Company Name',
      FieldDataType.STRING,
    ),
    new FieldDto('builderContact', 'Builder Contact', FieldDataType.STRING),
    new FieldDto('builderTel', 'Builder Telephone', FieldDataType.STRING),
    new FieldDto('builderEmail', 'Builder Email', FieldDataType.STRING),
    new FieldDto('lhsNo', 'LHS Number', FieldDataType.STRING),
    new FieldDto('rhsNo', 'RHS Number', FieldDataType.STRING),
    new FieldDto('meterSize', 'Meter Size', FieldDataType.ENUM),
    new FieldDto('flowRate', 'Flow Rate', FieldDataType.NUMBER),
    new FieldDto(
      'minPressureRequired',
      'Minimum Pressure Required',
      FieldDataType.NUMBER,
    ),
    new FieldDto(
      'buildingPlanSubmitted',
      'Building Plan Submitted',
      FieldDataType.BOOLEAN,
    ),
    new FieldDto('createdAt', 'Date Opened', FieldDataType.DATE),
    new FieldDto('applicationStatus', 'Status', FieldDataType.ENUM),
    new FieldDto('createdBy', 'Created By', FieldDataType.NUMBER),
    new FieldDto('modifiedBy', 'Modified By', FieldDataType.NUMBER),
    new FieldDto('modifiedAt', 'Date Modified', FieldDataType.DATE),
    new FieldDto('isDeleted', 'Is Deleted', FieldDataType.BOOLEAN),
  ],
};

export function getFieldsForModule(moduleName: string): FieldDto[] {
  return allFields[moduleName] || [];
}
