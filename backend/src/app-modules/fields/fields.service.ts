import { Injectable } from '@nestjs/common';
import { FieldDto } from './field.dto';
import { getFieldsForModule } from './module-field';
import { getListFields } from './fields';

@Injectable()
export class FieldsService {
  constructor() {}

  getListFields(moduleName: string): FieldDto[] {
    const fieldNames = getListFields(moduleName);
    const listFields = this.getFieldDTOFromFieldNames(moduleName, fieldNames);

    return listFields;
  }

  private getFieldDTOFromFieldNames(
    moduleName: string,
    fieldNames: string[],
  ): FieldDto[] {
    const allFields = getFieldsForModule(moduleName);
    return allFields.filter((field) => fieldNames.includes(field.name));
  }
}
