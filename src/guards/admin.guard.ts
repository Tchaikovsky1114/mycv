
import { CanActivate, ExecutionContext } from "@nestjs/common";


// admin guard가 제대로 되지 않은 이유 (Nest의 핵심 개념)

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if(!request.currentUser) {
      return false
    }
    return request.currentUser.admin;
  }
}