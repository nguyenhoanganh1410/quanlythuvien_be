import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt_access_token.guards';
import { Public } from 'src/decorators/auth.decorators';
import { Roles } from 'src/decorators/role.decorators';
import { USER_ROLE } from '@modules/user_roles/entities/user_role.entity';
import { RolesGuard } from '@modules/auth/guards/role.guards';
import { RequestWithUser } from 'src/types/request.type';

@Controller('users')
@UseGuards(JwtAccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/my-profile')
  getProfile(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.usersService.getUserWithRole(user.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(USER_ROLE.ADMIN)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
