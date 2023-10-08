
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthService } from './auth.service';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  
  constructor(
    private usersService:UsersService,
    private authService: AuthService
    ){}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
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
