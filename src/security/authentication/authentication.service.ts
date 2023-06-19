import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../resources/hashing.service';
import { Trainer } from 'src/trainer/entities/trainer.entity';
import { randomUUID } from 'crypto';
import jwtConfig from 'src/config/jwt.configuration';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from '../resources/refresh-token-ids.storage';
import { RefreshTokenDto } from '../resources/dto/refresh-tokens.dto';
import { CreateTrainerDto } from 'src/trainer/dto/create-trainer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  async signIn(signInDto: CreateTrainerDto) {
    const user = await this.trainerRepository.findOneBy({
      userName: signInDto.userName,
    });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Wrong password');
    }
    return await this.generateTokens(user);
  }

  async generateTokens(user: Trainer) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        username: user.userName,
        role: user.role,
      }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        { sub: number } & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
      });
      const user = await this.trainerRepository.findOneByOrFail({ id: sub });
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Invalid refresh token');
      }
      return this.generateTokens(user);
    } catch (error) {
      if (error instanceof InvalidatedRefreshTokenError) {
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
