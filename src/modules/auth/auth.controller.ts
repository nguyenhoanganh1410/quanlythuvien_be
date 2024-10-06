import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign_up.dto';
import { LocalAuthGuard } from './guards/local.guards';
import { RequestWithUser } from 'src/types/request.type';
import { JwtRefreshTokenGuard } from './guards/jwt_refresh_token.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() sign_up_dto: SignUpDto) {
    return await this.auth_service.signUp(sign_up_dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Req() request: RequestWithUser) {
    const { user } = request;
    return await this.auth_service.signIn(user.id.toString());
  }

  @UseGuards(JwtRefreshTokenGuard)
	@Post('refresh')
	async refreshAccessToken(@Req() request: RequestWithUser) {
		const { user } = request;
		const access_token = this.auth_service.generateAccessToken({
			user_id: user.id.toString(),
		});
		return {
			access_token,
		};
	}
}
