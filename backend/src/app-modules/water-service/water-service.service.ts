import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateWaterServiceDto } from './dto/create-water-service.dto';
import { UpdateWaterServiceDto } from './dto/update-water-service.dto';
import { WaterServiceResponseDto } from './dto/water-service-response.dto';

@Injectable()
export class WaterServiceService {
  constructor(private prisma: PrismaService) {}

  async create(
    createWaterServiceDto: CreateWaterServiceDto,
  ): Promise<WaterServiceResponseDto> {
    const createdRecord = await this.prisma.waterService.create({
      data: {
        ...createWaterServiceDto,
        appNumber: '',
      },
    });
    const updatedRecord = await this.prisma.waterService.update({
      where: { id: createdRecord.id },
      data: { appNumber: createdRecord.id.toString() },
    });

    return updatedRecord;
  }

  async findAll(
    filterString: string,
    sort?: Record<string, 'asc' | 'desc'>,
    page = 1,
    limit = 10,
  ): Promise<{
    data: WaterServiceResponseDto[];
    total: number;
  }> {
    let where: Record<string, any>;

    try {
      where = {
        isDeleted: false,
        ...JSON.parse(filterString),
      };
    } catch (error) {
      throw new Error(
        'Invalid filter format. Please provide a valid JSON string.',
      );
    }

    const skip = (page - 1) * limit;
    const limitAsNumber = Number(limit);

    const [data, total] = await Promise.all([
      this.prisma.waterService.findMany({
        where,
        orderBy: sort || { id: 'desc' },
        skip,
        take: limitAsNumber,
      }),
      this.prisma.waterService.count({ where }),
    ]);

    return {
      data,
      total,
    };
  }

  async findOne(id: number): Promise<WaterServiceResponseDto> {
    const waterService = await this.prisma.waterService.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!waterService) {
      throw new NotFoundException(`Water service with ID ${id} not found`);
    }

    return waterService;
  }

  async update(
    id: number,
    updateWaterServiceDto: UpdateWaterServiceDto,
  ): Promise<WaterServiceResponseDto> {
    await this.findOne(id);

    return this.prisma.waterService.update({
      where: { id },
      data: updateWaterServiceDto,
    });
  }

  async remove(id: number): Promise<WaterServiceResponseDto> {
    await this.findOne(id);

    return this.prisma.waterService.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
