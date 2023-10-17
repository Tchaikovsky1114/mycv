import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';


// 데코레이터는 인터셉터와 같이 사용해야 한다. 그 이유는 데코레이터는
// 의존성 주입을 받지 못하며 시스템 내부 인스턴스에 액세스할 수 없기 때문이다.
// 그래서 req의 session Object에는 접근할 수 있지만 해당 사용자를 찾기 위한
// 쿼리를 만드는데 필요한 UsersService에는 접근할 수 없다.

export const CurrentUser = createParamDecorator(
  // data는 데코레이터의 인자다.
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    return 'hi there';
  });
