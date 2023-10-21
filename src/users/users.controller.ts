import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
// 상대경로로 작성하는 습관 들이기
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
export class UsersController {
  
  constructor(
    private usersService:UsersService,
    private authService: AuthService
    ){}

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    // session.userId = (await user).id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
   const user = this.authService.signin(body.email, body.password);
   session.userId = (await user).id;
  
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
