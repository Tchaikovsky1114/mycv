import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    
    // see if email is in use
    const users = await this.usersService.find(email)
    if(users.length) {
      throw new BadRequestException('이미 사용중인 이메일입니다.');
    }

    // Hash the user's password
    
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    
    // Hash the salt and the password together
    const hash = await scrypt(password, salt, 32) as Buffer;
    
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex'); 

    // create a new user and save it
    const user = await this.usersService.create(email, result);
    // 2c1c34737e427de2.aa0d492aba7a20c560b0ee002d41e45568b657b9a2a2fab0293d325a9b065050
    // salt.hash

    return user;

  }

  async signin(email:string, password:string) {
    const [user] = await this.usersService.find(email);
    if(!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = await scrypt(password, salt, 32) as Buffer;
    
    if(storedHash !== hash.toString('hex')) throw new BadRequestException('잘못된 비밀번호입니다.')
    
    return user;
  }
}