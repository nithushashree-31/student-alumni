import { IsInt, IsBoolean, IsString, IsDate } from 'class-validator';

export class NotificationResponseDto {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;

  @IsInt()
  receiverUserId: number;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsBoolean()
  isRead: boolean;

  @IsDate()
  createdAt: Date;
}
