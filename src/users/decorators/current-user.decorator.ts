import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 데코레이터는 인터셉터와 같이 사용해야 한다. 그 이유는 데코레이터는
// 의존성 주입을 받지 못하며 시스템 내부 인스턴스에 액세스할 수 없기 때문이다.
// 그래서 req의 session Object에는 접근할 수 있지만 해당 사용자를 찾기 위한
// 쿼리를 만드는데 필요한 UsersService에는 접근할 수 없다.

export const CurrentUser = createParamDecorator(
  // data는 데코레이터의 인자다.
  // context인 이유는 http뿐만 아니라 gRPC, websocket, graphql 등 다양한 프로토콜을 지원하기 때문이다.
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // request.currentUser는 CurrentUserInterceptor에서 설정한 값이다.
    // CurrentUserInterceptor를 통하여 currentUser의 값을 받을 수 있다.
    return request.currentUser;
  });

