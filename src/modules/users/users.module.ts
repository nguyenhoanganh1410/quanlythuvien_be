import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRolesModule } from '@modules/user_roles/user_roles.module';
import { UsersRepository } from '@repositories/user.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserRolesModule,
  ],
  controllers: [UsersController],
  providers: [
		UsersService,
		{ provide: 'UsersRepositoryInterface', useClass: UsersRepository },
	],
  exports: [UsersService],
})
export class UsersModule { }