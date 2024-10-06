import {
	IsNotEmpty,
	MaxLength,
} from 'class-validator';

export class CreateBookDto {
	@IsNotEmpty()
	@MaxLength(50)
	ISBN: string;

	@IsNotEmpty()
	@MaxLength(50)
	title: string;

    @IsNotEmpty()
	@MaxLength(50)
	authName: string;

	@IsNotEmpty()
	type: string;

	@IsNotEmpty()
	language: string;

    @IsNotEmpty()
	quanlity: number;

	image: string;
}
