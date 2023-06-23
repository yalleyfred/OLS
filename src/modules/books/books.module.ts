import { Module } from '@nestjs/common';
import { BooksController } from './controller/books.controller';
import { BooksService } from './service/books.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService]
})
export class BooksModule {}
