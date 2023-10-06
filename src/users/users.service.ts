import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  
  constructor( @InjectRepository(User) private repo: Repository<User>){}

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create a new user instance
    // create를 사용하는 이유는 데이터를 저장하기 전에 몇가지 후크를 걸 수 있기 때문이다.
    // user.entity.ts에 정의된 @AfterInsert(), @AfterRemove(), @AfterUpdate()를 통해 로그를 띄우거나
    // 유효성 검사나, 데이터 변환 등을 위해 @BeforeInsert(), @BeforeUpdate() 등의 후크를 사용할 수도 있다.

    return await this.repo.save(user); // save this user to the database
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({id})
    if (!user) {
      throw new NotFoundException('찾으시는 유저는 존재하지 않습니다.')
    }
    return user;
  }
  
  async find(email: string) {
    const user =  await this.repo.findOne({ where: { email } });
    
    if (!user) {
      throw new NotFoundException('찾으시는 유저는 존재하지 않습니다.')
    }
    return user;
  }
  
  async update(id:number, attrs:UpdateUserDto) {
    const user = await this.repo.findOne({where:{id}});
    if (!user) {
      throw new NotFoundException('찾으시는 유저는 존재하지 않습니다.')
    }
    Object.assign(user, attrs); // user에 attrs를 덮어씌운다.
    this.repo.save(user); // save this user to the database
    return user;
  }

  async remove(id: number) {
    const user = await this.repo.findOne({where:{id}});
    if (!user) {
      throw new NotFoundException('찾으시는 유저는 존재하지 않습니다.')
    }
    return await this.repo.remove(user);
  }

}
