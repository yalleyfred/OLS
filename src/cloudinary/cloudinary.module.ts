import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';
import CLOUDINARY_CONFIG  from 'config/cloudinary.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    CloudinaryService,
    {
      provide: CLOUDINARY_CONFIG,
      useFactory: () => ({
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
      }),
    },
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}

