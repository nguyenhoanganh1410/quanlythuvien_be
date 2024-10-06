import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { UserRole, UserRoleDocument } from '@modules/user_roles/entities/user_role.entity';
import { UserRolesRepositoryInterface } from '@modules/user_roles/interfaces/user_roles.interface';

@Injectable()
export class UserRolesRepository
	extends BaseRepositoryAbstract<UserRoleDocument>
	implements UserRolesRepositoryInterface {
	constructor(
		@InjectModel(UserRole.name)
		private readonly user_role_model: Model<UserRoleDocument>,
	) {
		super(user_role_model);
	}
}