import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { UserRole } from './entities/user_role.entity';
import { UserRolesRepositoryInterface } from './interfaces/user_roles.interface';
@Injectable()
export class UserRolesService extends BaseServiceAbstract<UserRole> {
	constructor(
		@Inject('UserRolesRepositoryInterface')
		private readonly user_roles_repository: UserRolesRepositoryInterface,
	) {
		super(user_roles_repository);
	}
}