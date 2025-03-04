import { config as dotenvConfig } from 'dotenv';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

// ✅ Check if .env file exists before loading
if (!fs.existsSync('.env')) {
  console.error('❌ ERROR: .env file is missing! Ensure it exists in the root directory.');
  process.exit(1);
}

// ✅ Load environment variables
dotenvConfig();

// ✅ Validate required env variables

// ✅ Debugging output
console.log('✅ Environment Variables Loaded:', process.env);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? 'Exists' : 'Not Found'}`);
console.log(`- FRONTEND_URL: ${process.env.FRONTEND_URL}`);

// 🚀 Bootstrap NestJS application
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`🚀 Server is running on port ${port}`);
  } catch (error) {
    console.error('❌ ERROR during server bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();


