import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from "./user.entity"
import { BadRequestException, NotFoundException } from "@nestjs/common"

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>
beforeEach(async () => {
  const users: User[] = [];

  fakeUserService = {
    find: (email: string) => {
      const filteredUsers = users.filter(user => user.email === email);
      return Promise.resolve(filteredUsers);
    },
    create: (email: string, password: string) => {
      const user = {id: users.length, email, password} as User
      users.push( user)
      return Promise.resolve(user); 
    }
      
  }

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUserService,
      }
    ]
  }).compile()

   service = module.get(AuthService);
});



  it('should be defined', async () => {
    expect(service).toBeDefined();
  })

  it('create a new user with salted and hashed password', async () => {
    const user = await service.signup('test@test.test', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUserService.find = () => Promise.resolve(
      [{ id: 1, email: 'a', password: '1' } as User]
      );
    await expect(service.signup('asdf@asdf.com', 'asdf'))
    .rejects.toThrow(BadRequestException,);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {

    // 여기서 fakeUserService.find를 재정의하는 이유는
    // fakeUserService.find를 beforeEach에서 정의한대로 사용하면 fakeUserService.find가 Promise.resolve([])를 반환하기 때문에
    // service.signin('test@test', 'd')가 Promise.reject를 반환하지 않고 Promise.resolve를 반환하게 되기 때문이다.
    fakeUserService.find = () => Promise.resolve([
      {email: 'test@test.test', password: 'd'} as User
    ])
    await expect(service.signin('test@test.test','d'))
    .rejects.toThrow(BadRequestException)
    // 위와 같이 코드를 작성하면 테스트가 통과되는 오류가 발생하는데 그 이유는 실제로 BadRequestException을 발생시키기 때문이다.
    // 왜냐하면 비밀번호를 비교할 때 salt를 사용하지 않기 때문이다.
    // 그래서 salt를 사용하도록 코드를 수정해야 한다.
  })

  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com','mypassword');
    const user = await service.signin('asdf@asdf.com','mypassword');
    expect(user).toBeDefined();
  })

})
