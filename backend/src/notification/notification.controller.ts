import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    return await this.notificationService.create(createNotificationDto);
  }

  @Get(':id')
  async findNotificationsByReceiver(@Param('id') id: number): Promise<NotificationResponseDto[]> {
    return await this.notificationService.findAllByReceiver(+id);

  }

  @Patch(":id")
  async update(@Param('id') id:number):Promise<NotificationResponseDto>{
    return await this.notificationService.update(+id);
  }

  @Patch()
  async updateAllNotifications(@Query() query:ExpressQuery):Promise<any>{
    if(query.readAll==="true"){
      return await this.notificationService.markAllAsRead();
    }
  }

  // Delete a notification
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NotificationResponseDto> {
    return await this.notificationService.remove(id);
  }
}
