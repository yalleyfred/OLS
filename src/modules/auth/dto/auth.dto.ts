import { IsString, IsEmail, IsNotEmpty } from "class-validator";


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

}

export class SignInDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

}