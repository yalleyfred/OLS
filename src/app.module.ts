import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [ConfigModule.forRoot({    
    isGlobal: true,
    cache: true,
  }),UsersModule, PrismaModule, AuthModule, BooksModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
