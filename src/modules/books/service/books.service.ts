import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto, EditBookDto } from '../dto/book.dto';
import { Book } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService, private cloud: CloudinaryService) {}

    async create(adminId: number, book: CreateBookDto, file: Express.Multer.File): Promise<Book> {

        try {
            const user = await this.prisma.user.findFirst({
                where: {id: adminId, deletedAt: null}
            });
    
            if(user.role !== 'ADMIN') throw new HttpException('Access denied', 401);
            const existingBook = await this.prisma.book.findFirst({
                where: {
                    title: book.title
                }
            });
            if (existingBook) throw new HttpException("Book already exists", 400);
            console.log("got here")
            const fileurl = await this.cloud.upload(file);
            console.log(fileurl)
            return this.prisma.book.create({ 
                data: {
                    ...book,
                    fileUrl: fileurl
                }
             });
        }catch(error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async getBooks(userId: number): Promise<Book[]> {
        try {
            const user = await this.prisma.user.findFirst({where: {id: userId, deletedAt: null}})
            if(!user) throw new HttpException("User not found", 404);
            return await this.prisma.book.findMany({where: {deletedAt: null}});
        }catch(error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async getBookById(userId: number, bookId: number): Promise<Book> {
        try {
            const user = await this.prisma.user.findFirst({where: {id: userId, deletedAt: null}})
            if(!user) throw new HttpException("User not found", 404);
            const book = await this.prisma.book.findFirst({where: {id: bookId, deletedAt: null}});
            if (!book) throw new HttpException("Book not found", 404);
            return book;
        }catch(error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async updateBook(adminId: number, bookId: number, book: EditBookDto): Promise<Book> {
        try {
            const user = await this.prisma.user.findFirst({where: {id: adminId, deletedAt: null}})
            if(user.role !== 'ADMIN') throw new HttpException('Access denied', 401);

            const existingBook = await this.prisma.book.findFirst({where: {id: bookId, deletedAt: null}})
            if (!existingBook) throw new HttpException("Book not found", 404);

            const theBook = await this.prisma.book.findUnique({where: {title: book.title}})
            if (theBook) throw new HttpException("Book with same title already exists", 400);
            return await this.prisma.book.update({
                where: {id:bookId},
                data: {...book}
            });
        }catch(error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async deleteBook(adminId: number, bookId: number): Promise<void> {
        try {
            const user = await this.prisma.user.findFirst({where: {id: adminId, deletedAt: null}})
    
            if(user.role !== 'ADMIN') throw new HttpException('Access denied', 401);
            const existingBook = await this.prisma.book.findFirst({where: {id: bookId, deletedAt: null}})
            if (!existingBook) throw new HttpException("Book not found", 404);
            await this.prisma.book.update({
                where: {id:bookId},
                data: {deletedAt: new Date(Date.now()), availabilityStatus: false}
            });

            return Promise.resolve();
        }catch(error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async changeBookStatus(adminId: number, bookId: number): Promise<void> {
        try {
            const user = await this.prisma.user.findFirst({where: {id: adminId, deletedAt: null}})
    
            if(user.role !== 'ADMIN') throw new HttpException('Access denied', 401);
            const existingBook = await this.prisma.book.findFirst({where: {id: bookId}})
            if (!existingBook) throw new HttpException("Book not found", 404);

            if(existingBook.availabilityStatus == true) {
                await this.prisma.book.update({
                    where: {id:bookId},
                    data: {availabilityStatus: false, deletedAt: new Date(Date.now())}
                });
            }else if(existingBook.availabilityStatus == false) {
                await this.prisma.book.update({
                    where: {id:bookId},
                    data: {availabilityStatus: true, deletedAt: null}
                });
            }
            return Promise.resolve();
        }catch(error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
