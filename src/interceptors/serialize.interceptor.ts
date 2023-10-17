import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { Observable,map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'src/decorators/serialize.decorator';



// 이 인터셉터는 모든 컨트롤러의 응답을 가로채서 plainToClass를 통해 응답을 클래스로 변환한다.
// 이렇게 하면 컨트롤러에서 응답을 클래스로 변환하는 과정을 생략할 수 있다.
// 이 인터셉터는 해당 인터샙터를 사용하고자 하는 컨트롤러에서
// @UseInterceptors(ClassSerializerInterceptor)를 통해 사용할 수 있다.

// 여기서의 Serialize의 뜻은 클래스를 JSON으로 변환하는 것이다.
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(_: ExecutionContext, handler: CallHandler): Observable<any> {
    
    // 요청 핸들러가 요청을 처리하기 전에 실행된다
    // console.log('핸들러에 접근중')
    return handler.handle().pipe(
      map((data: any) => {
        // console.log('핸들러에 접근 완료');
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
