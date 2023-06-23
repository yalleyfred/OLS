import { Injectable, HttpException } from '@nestjs/common';
import {User} from "prisma";
import { PrismaService } from 'src/prisma/prisma.service';
import { IUsersService } from '../interface/users.interface';
import { CreateProfileDto, EditProfileDto } from '../dto/Profile.dto';

@Injectable()
export class UsersService implements IUsersService {
    constructor(private readonly prisma: PrismaService) {}

    public async  createUserProfile(userId: number, profile: CreateProfileDto): Promise<User> {
        const existingUserProfile = await this.prisma.profile.findFirst({
            where: {userId, deletedAt: null}
        });
        if(existingUserProfile) throw new HttpException(`User ${userId} profile already exists`, 400);

        return this.prisma.profile.create({
            data: {
                userId: userId,
                ...profile
            }
        });
    }


    public async getUsers(userId:number): Promise<User[]> {
        return await this.prisma.user.findMany({
            where: {id: userId, deletedAt: null},
            select: {
                username: true,
                email: true,
                Profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                        address: true,
                        registrationDate: true,
                        phone: true
                    }
                }
            }
        });
    }

    public async getUsersById(userId: number, id: number): Promise<User> {
        return await this.prisma.profile.findFirst({
            where: { id, userId, deletedAt: null },
            select: {
                user: {
                    select: {
                        username: true,
                        email: true,
                        role: true   
                    }
                },
                phone: true,
                address: true,
                firstName: true,
                lastName: true,
                registrationDate: true,
                accountStatus: true
            }
        });
    }

    public async updateUserProfile(profile: EditProfileDto, userId: number, id:number): Promise<User> {
        const existingUser = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null }
        });

        if(!existingUser) throw new HttpException(`User ${userId} not found`, 404);

        const existingUserProfile = await this.prisma.profile.findFirst({
            where: {id, userId, deletedAt: null}
        });

        if(!existingUserProfile) throw new HttpException(`User ${userId} profile doesn't exists`, 400);

        return await this.prisma.profile.update({
            where: { id },
            data: profile,
        });
    }


    public async deleteUserProfile(userId: number, id:number): Promise<void> {
         await this.prisma.user.update({
            where: { id: userId },
            data: {deletedAt: new Date(Date.now())},
        });
        await this.prisma.profile.update({
            where: { id },
            data: {deletedAt: new Date(Date.now()), accountStatus: false},
        })
        return Promise.resolve();
    }


    public async changeAccountStatus(userId: number, id:number): Promise<void> {
        const existingUser = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
           
        });
        
        if(existingUser.role !== 'ADMIN') throw new HttpException(`Access denied`, 401);
        const userProfile = await this.prisma.profile.findFirst({
            where: { id,  },
        });
        if(!userProfile) throw new HttpException(`User ${userId} profile doesn't exists`, 400);

        if(userProfile.accountStatus == true) {
            await this.prisma.profile.update({
                where: { id },
                data: {accountStatus: false, deletedAt: new Date(Date.now()) },
            });
        }else if(userProfile.accountStatus == false) {
            await this.prisma.profile.update({
                where: { id },
                data: {accountStatus: true, deletedAt: null },
            });
        }
        return Promise.resolve();
    }
}
