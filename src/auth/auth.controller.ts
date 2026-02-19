import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/authUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: AuthUserDto) {
    const { access_token } = await this.authService.signIn(
      body.email,
      body.password,
    );

    return {
      message: 'Login realizado com sucesso',
      access_token,
    };
  }
}
