import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response, Request } from 'express';
import { RefreshTokenDto } from '../resources/dto/refresh-tokens.dto';
import { CreateTrainerDto } from 'src/trainer/dto/create-trainer.dto';
import { promisify } from 'util';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Body() signInDto: CreateTrainerDto, // @Res ({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authenticationService.signIn(signInDto);
    await promisify(request.login).call(request, user);
    response.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true,
      sameSite: true,
    });
    response.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: true,
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
      secure: false,
      httpOnly: true,
      sameSite: true,
    });
    response.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: true,
    });
  }
}
