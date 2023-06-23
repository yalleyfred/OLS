import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import  CLOUDINARY_CONFIG  from 'config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(CLOUDINARY_CONFIG)
    private readonly cloudinaryConfig: ConfigType<typeof CLOUDINARY_CONFIG>,
  ) {
    cloudinary.config({
      cloud_name: this.cloudinaryConfig.cloudName,
      api_key: this.cloudinaryConfig.apiKey,
      api_secret: this.cloudinaryConfig.apiSecret,
    });
  }

 // Define your Cloudinary-related methods here
 async upload(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path);
    // Delete the temporary file from the local filesystem
    // fs.unlinkSync(file.path);
    return result.secure_url;
  }
}




