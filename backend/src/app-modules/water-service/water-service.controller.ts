import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { CreateWaterServiceDto } from './dto/create-water-service.dto';
import { UpdateWaterServiceDto } from './dto/update-water-service.dto';
import { WaterServiceResponseDto } from './dto/water-service-response.dto';
import { WaterServiceService } from './water-service.service';
import { WaterServiceQueryDto } from './dto/WaterServiceQueryDto';

@Controller('water-service')
export class WaterServiceController {
  constructor(private readonly waterServiceService: WaterServiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createWaterServiceDto: CreateWaterServiceDto,
  ): Promise<WaterServiceResponseDto> {
    return this.waterServiceService.create(createWaterServiceDto);
  }

  @Get()
  async findAll(@Query() query: WaterServiceQueryDto) {
    try {
      let filterObj = {};
      if (query.filter) {
        try {
          filterObj = JSON.parse(query.filter);
        } catch {
          throw new BadRequestException('Invalid filter format');
        }
      }
      
      let sortQuery;

      const result = await this.waterServiceService.findAll(
        JSON.stringify(filterObj),
        sortQuery,
        query.page || 1,
        query.limit || 10,
      );

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch water services');
    }
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WaterServiceResponseDto> {
    return this.waterServiceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWaterServiceDto: UpdateWaterServiceDto,
  ): Promise<WaterServiceResponseDto> {
    return this.waterServiceService.update(id, updateWaterServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WaterServiceResponseDto> {
    return this.waterServiceService.remove(id);
  }
}
