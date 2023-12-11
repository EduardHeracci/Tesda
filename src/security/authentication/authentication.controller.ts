import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import { RefreshTokenDto } from '../resources/dto/refresh-tokens.dto';
import { CreateTrainerDto } from '@/trainer/dto/create-trainer.dto';
import { Public } from '../resources/decorators/public.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    // @Req() request: Request,
    @Body() signInDto: CreateTrainerDto, // @Res ({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authenticationService.signIn(signInDto);
    // await promisify(request.login).call(request, user);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: true,
      maxAge: 900000,
    });
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: false,
      sameSite: true,
      maxAge: 86400000,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(
    @Res({ passthrough: true }) response: Response,
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.refreshTokens(refreshTokenDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: true,
      maxAge: 900000,
    });
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: false,
      sameSite: true,
      maxAge: 86400000,
    });
  }
}
