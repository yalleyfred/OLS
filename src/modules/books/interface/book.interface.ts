import { Book } from "@prisma/client";
import { CreateBookDto, EditBookDto } from "../dto/book.dto";

export interface IbooksService {   
    creatBook(adminId: number, book: CreateBookDto): Promise<Book>
    getBooks(userId: number): Promise<Book[]>
    deleteBook(adminId: number, bookId: number): Promise<void>
    updateBook(adminId: number, bookId: number, book: EditBookDto): Promise<Book>
    getBookById(userId: number, bookId: number): Promise<Book>
    changeBookStatus(adminId: number, bookId: number): Promise<void>
}