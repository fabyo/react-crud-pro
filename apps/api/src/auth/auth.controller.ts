import { Controller, Post, Body, HttpCode } from '@nestjs/common'; // <-- Importe HttpCode
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: LoginDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200) // <-- Adicione esta linha
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
