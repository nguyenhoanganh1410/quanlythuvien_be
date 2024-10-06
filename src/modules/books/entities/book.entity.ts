import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BookDocument = mongoose.HydratedDocument<Book>;
@Schema({
	collection: 'books',
})
export class Book extends BaseEntity {
	@Prop({ required: true, unique: true })
	ISBN: string;

	@Prop({default: ''})
	image: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	authName: string;

    @Prop({ required: true })
	type: string;

    @Prop({ required: true })
	language: string;

	@Prop({ required: true })
	quanlity: number;

	@Prop({ default: true })
	status: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
