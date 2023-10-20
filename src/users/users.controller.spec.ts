import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { User } from "./user.entity"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { Controller } from "@nestjs/common/interfaces"


describe('UserService', () => {
  let fakeUserService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>
  let controller:Controller
  beforeEach(async() => {
    const users:User[] = [];
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({id, email: 'test@test.com'} as User)
      },
      find: (email: string) => {
        return Promise.resolve([ { id: 8, email } as User ])
      },
      create: (email: string, password: string) => {
        users.push({id:users.length,email,password} as User);
        return Promise.resolve({ email } as User)
      },
      update: (id: number, attrs: UpdateUserDto) => {
        const foundUser = users.find((user) => user.id === id);
        users.filter(user => user.id !== id);
        
        return Promise.resolve({ ...attrs, id } as User)
      },
      remove: (id: number) => {
        return Promise.resolve({} as User)
      }
    },
    fakeAuthService = {

    }
    const module:TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();
    controller = module.get<UsersController>(UsersController);
  })
  it('컨트롤러 이닛', () => {
    expect(controller).toBeDefined();
  })
})
