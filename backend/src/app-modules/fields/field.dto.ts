import { IsString } from 'class-validator';

export enum FieldDataType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  ENUM = 'enum',
}

export class FieldDto {
  constructor(name: string, displayName: string, dataType: FieldDataType) {
    this.displayName = displayName;
    this.name = name;
    this.dataType = dataType;
  }

  @IsString()
  displayName: string;

  @IsString()
  name: string;

  @IsString()
  dataType: FieldDataType;
}
