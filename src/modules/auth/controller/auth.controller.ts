import { Body, Controller, Post, HttpCode, HttpStatus, Req, Get, Res, Response, UseGuards} from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { JwtGuard } from '../guard/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    private signUp(@Body() user: SignUpDto) {
        return this.authService.signUp(user);
    };

    @HttpCode(HttpStatus.OK)
    @Post('login')
    private async login(@Body() user: SignInDto ) {
         const result =  await this.authService.login(user);
         return {access_token: result.access_token, roles: result.roles};
    };

    @UseGuards(JwtGuard)
    @Get('refresh')
    private async refresh(@Req() req) {
        const token:string = req.headers.authorization
        return await this.authService.verifyRefreshToken(token);
       
    }
}
