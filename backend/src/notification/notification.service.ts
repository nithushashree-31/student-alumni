import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { GlobalService } from 'src/common/global/global.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly globalService: GlobalService,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    const { userId, receiverUserId, title, message, isRead } =
      createNotificationDto;
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        receiverUserId,
        title,
        message,
        isRead,
      },
    });
    return notification;
  }

  async findAllByReceiver(id: number): Promise<NotificationResponseDto[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { receiverUserId: id },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        receiver: { select: { userId: true, firstName: true } },
        sender: { select: { userId: true, firstName: true } },
      },
    });
    return notifications;
  }

  async findOne(id: number): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async remove(id: number): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.delete({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async update(id: number): Promise<any> {
    return await this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(): Promise<any> {
    const user = this.globalService.getUser();
    return await this.prisma.notification.updateMany({
      where: { receiverUserId: user.userId },
      data: { isRead: true },
    });
  }
}
