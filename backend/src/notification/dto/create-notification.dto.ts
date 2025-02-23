import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  userId: number;

  @IsInt()
  receiverUserId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean = false;
}
