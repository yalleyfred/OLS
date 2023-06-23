import { Controller, UploadedFile, UseInterceptors, UseGuards, HttpCode, HttpStatus, Post, Get, Param, ParseIntPipe, Query, Patch, Delete, Body, Req } from '@nestjs/common';
import { BooksService } from '../service/books.service';
import { CreateBookDto, EditBookDto } from '../dto/book.dto';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    private createBook(@GetUser('id') adminId: number, @Body() book: CreateBookDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
        console.log(req.files)
        return this.bookService.create(adminId, book, file);
    }

    @HttpCode(HttpStatus.OK)
        @Get()
        private getBooks(@GetUser('id') adminId: number) {
            return this.bookService.getBooks(adminId);
    }

    @HttpCode(HttpStatus.OK)
        @Get(":id")
        private getBookById(@GetUser("id") adminId: number, @Param('id', ParseIntPipe) bookId: number) {
            return this.bookService.getBookById(adminId, bookId);
    }

    @HttpCode(HttpStatus.OK)
        @Patch(":id")
        private updateBook(@GetUser('id') adminId: number,@Param('id', ParseIntPipe) bookId: number, @Body() book: EditBookDto) {
            return this.bookService.updateBook(adminId, bookId, book);
    }

    @HttpCode(HttpStatus.OK)
        @Delete(":id")
        private deleteBook(@GetUser('id') adminId: number, @Param('id', ParseIntPipe) bookId: number) {
            return this.bookService.deleteBook(adminId, bookId);
    }

    @HttpCode(HttpStatus.OK)
        @Post("status")
        private changeBookStatus(@GetUser('id') adminId: number, @Query('id', ParseIntPipe) bookId: number) {
            return this.bookService.changeBookStatus(adminId, bookId);
    }

}
