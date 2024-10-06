import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { Book } from '../entities/book.entity';

export interface BooksRepositoryInterface
	extends BaseRepositoryInterface<Book> {}
