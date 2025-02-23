import { Controller, Get, Param, Req } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldDto } from './field.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}
  @Get('list/:moduleName')
  getFieldsByModuleName(@Param('moduleName') moduleName: string): FieldDto[] {
    return this.fieldsService.getListFields(moduleName);
  }
}
