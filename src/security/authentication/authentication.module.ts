import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { HashingService } from '../resources/hashing.service';
import { BcryptService } from '../resources/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '@/config/jwt.configuration';
import { RefreshTokenIdsStorage } from '../resources/refresh-token-ids.storage';
import { Trainer } from '@/trainer/entities/trainer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerSerializer } from '../resources/serializer/trainer-serializer/trainer.serializer';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainer]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthenticationService,
    RefreshTokenIdsStorage,
    TrainerSerializer,
  ],
})
export class AuthenticationModule {}
// export class AuthenticationModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(
//         session({
//           secret: process.env.SESSION_SECRET_KEY,
//           resave: false,
//           saveUninitialized: false,
//           cookie: {
//             sameSite: true,
//             httpOnly: true,
//           },
//         }),
//         passport.initialize(),
//         passport.session(),
//       )
//       .forRoutes('*');
//   }
// }
