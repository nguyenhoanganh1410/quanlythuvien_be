import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { BooksRepositoryInterface } from '@modules/books/interfaces/book.interface';
import { Book, BookDocument } from '@modules/books/entities/book.entity';

@Injectable()
export class BookRepository
	extends BaseRepositoryAbstract<BookDocument>
	implements BooksRepositoryInterface
{
	constructor(
		@InjectModel(Book.name)
		private readonly book_model: Model<BookDocument>,
	) {
		super(book_model);
	}
}
