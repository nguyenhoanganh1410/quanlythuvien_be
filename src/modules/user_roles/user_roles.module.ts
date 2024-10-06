import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { UserRolesController } from './user_roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRole, UserRoleSchema } from './entities/user_role.entity';
import { UserRolesRepository } from '@repositories/user_roles.reponsitory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserRole.name, schema: UserRoleSchema }]),
  ],
  controllers: [UserRolesController],
  providers: [
		UserRolesService,
		{
			provide: 'UserRolesRepositoryInterface',
			useClass: UserRolesRepository,
		},
	],
  exports: [UserRolesService],
})
export class UserRolesModule {}
