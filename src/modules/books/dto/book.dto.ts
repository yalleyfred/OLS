import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto  {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    publicationDate: string;

    @IsString()
    @IsNotEmpty()
    isbn: string;

    @IsString()
    @IsNotEmpty()
    language: string;

    @IsString()
    @IsNotEmpty()
    coverImage: string;

    @IsString()
    @IsNotEmpty()
    fileUrl: string;

}

export class EditBookDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsOptional()
    publicationDate?: string;

    @IsString()
    @IsOptional()
    isbn?: string;

    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsString()
    @IsOptional()
    fileUrl?: string;
}