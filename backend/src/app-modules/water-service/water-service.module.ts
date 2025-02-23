import { Module } from '@nestjs/common';
import { WaterServiceService } from './water-service.service';
import { WaterServiceController } from './water-service.controller';

@Module({
  controllers: [WaterServiceController],
  providers: [WaterServiceService],
})
export class WaterServiceModule {}
