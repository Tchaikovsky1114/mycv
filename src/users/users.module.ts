import { Module,MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUserMiddleWare } from '../middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // {
    // provide: APP_INTERCEPTOR,
    // useClass: CurrentUserInterceptor
    // }
  ],
})
export class UsersModule {
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(
      CurrentUserMiddleWare
    ).forRoutes('*')
  }
}
