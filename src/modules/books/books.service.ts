import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { BooksRepositoryInterface } from './interfaces/book.interface';

@Injectable()
export class BooksService extends BaseServiceAbstract<Book> {
	constructor(
		@Inject('BooksRepositoryInterface')
		private readonly booksRepository: BooksRepositoryInterface,
	) {
		super(booksRepository);
	}

	async create(create_dto: CreateBookDto): Promise<Book> {
		const book = await this.booksRepository.create({
			...create_dto,
		});
		return book;
	}
}
