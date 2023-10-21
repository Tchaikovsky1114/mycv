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
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: UserDto) {
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = this.authService.signup(body.email, body.password);
    session.userId = (await user).id;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
   const user = await this.authService.signin(body.email, body.password);
   session.userId =  user.id;
   const {id,email, ...rest} = user;
   
   return {id,email};
  }

  @Get('/user/:id')
  async findById(@Param('id',ParseIntPipe) id: number) {
    
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
