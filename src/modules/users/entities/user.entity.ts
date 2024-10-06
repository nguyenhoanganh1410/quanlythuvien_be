import { BaseEntity } from '@modules/shared/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { UserRole } from '@modules/user_roles/entities/user_role.entity';

export type UserDocument = HydratedDocument<User>;

export enum GENDER {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    toJSON: {
        getters: true,
        virtuals: true,
    },
})
export class User extends BaseEntity {
    @Prop({
        required: true,
        minlength: 2,
        maxlength: 60,
        set: (firstName: string) => {
            return firstName.trim();
        },
    })
    firstName: string;

    @Prop({
        required: true,
        minlength: 2,
        maxlength: 60,
        set: (lastName: string) => {
            return lastName.trim();
        },
    })
    lastName: string;

    @Prop({
        required: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    })
    email: string;

    @Prop({
        match: /^([+]\d{2})?\d{10}$/,
        get: (phoneNumber: string) => {
            if (!phoneNumber) {
                return;
            }
            const last_four_digits = phoneNumber.slice(phoneNumber.length - 4);
            return `***-***-${last_four_digits}`;
        },
    })
    phoneNumber: string;

    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Exclude()
    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        default:
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    })
    avatar: string;

    @Prop({
        enum: GENDER,
    })
    gender: GENDER;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: UserRole.name,
    })
    @Type(() => UserRole)
    @Transform((value) => value.obj.role?.name, { toClassOnly: true })
    role: UserRole;

    @Prop()
    classRoom: string;

    @Prop()
    currentRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);