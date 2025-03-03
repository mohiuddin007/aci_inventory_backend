import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User Registration' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', example: 'SecurePass123' },
      },
    },
  })
  @Post('register')
  async register(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.authService.register(username, password);
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        password: { type: 'string', example: 'SecurePass123' },
      },
    },
  })
  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return this.authService.login(username, password);
  }
}
