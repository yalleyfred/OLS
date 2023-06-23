import { Body, Controller, Post, Get, Patch, Delete, Param, Query, ParseIntPipe, UseGuards, HttpCode, HttpStatus, } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { CreateProfileDto, EditProfileDto } from '../dto/Profile.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    private createUserProfile(@GetUser('id') userId: number, @Body() profile: CreateProfileDto) {
        return this.userService.createUserProfile(userId, profile);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    private getUsers(@GetUser('id') userId:number): Promise<User[]> {
        return this.userService.getUsers(userId);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    private getUsersById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUsersById(userId, id);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(":id")
    private updateUserProfile(@GetUser('id') userId: number, @Body() user: EditProfileDto, @Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.updateUserProfile(user, userId, id);
    }  
    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    private deleteUserAccount(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.deleteUserProfile(userId, id);
    }

    @HttpCode(HttpStatus.OK)
    @Post("status")
    private changeAccountStatus(@GetUser('id') userId: number, @Query('id', ParseIntPipe) id: number): Promise<void> {
        return this.userService.changeAccountStatus(userId, id);
    }
}