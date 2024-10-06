import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt_access_token.guards';
import { Public } from 'src/decorators/auth.decorators';
import { Roles } from 'src/decorators/role.decorators';
import { USER_ROLE } from '@modules/user_roles/entities/user_role.entity';
import { RolesGuard } from '@modules/auth/guards/role.guards';

@Controller('books')
@UseGuards(JwtAccessTokenGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(USER_ROLE.ADMIN)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAccessTokenGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  
  @Put(':id')
  @Roles(USER_ROLE.ADMIN)
	@UseGuards(RolesGuard)
	@UseGuards(JwtAccessTokenGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateBookDto) {
    console.log(updateUserDto);
    return this.booksService.update(id, updateUserDto);
  }

}
