import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UsersService, PrismaService
  ],
  controllers: [UsersController]
})
export class UsersModule {}
