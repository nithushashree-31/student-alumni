import { PartialType } from '@nestjs/mapped-types';
import { CreateWaterServiceDto } from './create-water-service.dto';

export class UpdateWaterServiceDto extends PartialType(CreateWaterServiceDto) {}
