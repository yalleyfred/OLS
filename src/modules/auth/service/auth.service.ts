import { Injectable, HttpException, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2"
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import {Handler} from 'express';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private config: ConfigService, private jwt: JwtService) { }

    async signUp(user: SignUpDto): Promise<{access_token: string, roles: [string]}> {
        try {
         const allusers = await this.prisma.user.findMany();
         const existingUser = await this.prisma.user.findFirst({
            where: { email: user.email, username: user.username, deletedAt: null},
            select: { id: true, password: true, email: true, role: true}
        });
         if (existingUser) throw new HttpException('User already exists', 400);
         allusers.map(el => {
            if(el.username == user.username) throw new HttpException('Username already exists', 400);
         })
         if(user.password !== user.confirmPassword) throw new HttpException('Passwords do not match', 400);
         const hashedPassword = await argon.hash(user.password);

         const newUser =  await this.prisma.user.create({
                data: {
                username: user.username,
                email: user.email,
                password: hashedPassword
                }
            });
        
           const token = this.signToken(newUser.id, newUser.email);
           return {access_token: (await token).access_token, roles: [newUser.role]}
            
        }catch (err) {
            throw err
        }
    }


    async login(user: SignInDto): Promise<{access_token: string, roles: [string]}> {
        try {
            const existingUser = await this.prisma.user.findFirst({
                where: { email: user.email, deletedAt: null },
                select: { id: true, password: true, email: true, role: true}
            });
            if (!existingUser) throw new HttpException('User does not exist, Please signUp', 404);

            const passwordCheck = await argon.verify(existingUser.password, user.password);
            if (!passwordCheck)  throw new HttpException('Invalid password', 400);

            const token = this.signToken(existingUser.id, existingUser.email);

            return {access_token: (await token).access_token, roles: [existingUser.role]}
        }catch (err) {
            throw err;
        }
    }


    public async verifyRefreshToken(token: string): Promise<{access_token: string, roles: [string]}> {
        try {
            const secret = this.config.get("JWT_SECRET")

            if(!token) throw new UnauthorizedException()
            const access = token.slice(7)

            const decoded = await this.jwt.verify(access, {secret: secret});
            const foundUser = await this.prisma.user.findFirst({where: {email: decoded.email, deletedAt: null}});
            if(!foundUser) throw new HttpException("No user found", 404);
            const refreshToken = this.signToken(foundUser.id, foundUser.email)
            return {access_token: (await (refreshToken)).access_token, roles: [foundUser.role]};
        }catch (err) {
            throw err;
        }
    }

    private async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email: email
        };

        const secret = this.config.get("JWT_SECRET");
        const expires = this.config.get("JWT_Expires_IN");

        const token = this.jwt.sign(payload, {secret: secret, expiresIn: expires });
        
        return { access_token: token };
    }
}
 