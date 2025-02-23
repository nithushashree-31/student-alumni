import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { WaterServiceModule } from './app-modules/water-service/water-service.module';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { FieldsModule } from './app-modules/fields/fields.module';
import { GlobalModule } from './common/global/global.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    NotificationModule,
    WaterServiceModule,
    FieldsModule,
    GlobalModule
  ],
})
export class AppModule {}
