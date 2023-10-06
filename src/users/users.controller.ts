import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/decorators/serialize.decorator';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  
  constructor(private usersService:UsersService){}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
  @Get('/user/:id')
  async findById(@Param('id',ParseIntPipe) id: number) {
    console.log('handler is running');
    const user = await this.usersService.findOne(id);
    if(!user) {
      throw new NotFoundException('찾으시는 유저는 존재하지 않습니다.')
    }
    return user;
  }

  @Get('/user')
  findByEmail(@Query('email') email:string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

}
