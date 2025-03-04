import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { WaterServiceModule } from './app-modules/water-service/water-service.module';
import { FieldsModule } from './app-modules/fields/fields.module';
import { GlobalModule } from './common/global/global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensure environment variables are loaded globally
      envFilePath: '.env', // Specify .env file
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    NotificationModule,
    WaterServiceModule,
    FieldsModule,
    GlobalModule,
  ],
})
export class AppModule {}


