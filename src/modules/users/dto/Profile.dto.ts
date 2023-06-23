import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    registrationDate: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}

export class EditProfileDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    registrationDate?: string;

    @IsString()
    @IsOptional()
    phone?: string;
}