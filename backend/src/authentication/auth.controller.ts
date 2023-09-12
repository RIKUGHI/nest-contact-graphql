import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Guest } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Guest()
  @Post('/login')
  async login(
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully login!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: err.message,
      });
    }
  }

  @Guest()
  @Post('/register')
  async register(
    @Req() req: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUserDto,
  ): Promise<any> {
    // response.cookie('kesapian', 'lol', {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    //   maxAge: 1 * 60 * 1000,
    // });
    // response.clearCookie('kesapian', {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    // });
    // console.log(req.headers.cookie);
    // console.log(req.cookies);

    return response.json({
      message: 'sapi',
    });
    // try {
    //   const result = await this.authService.register(registerDto);
    //   return response.status(200).json({
    //     status: 'Ok!',
    //     message: 'Successfully register user!',
    //     result: result,
    //   });
    // } catch (err) {
    //   return response.status(500).json({
    //     status: 'Error!',
    //     message: 'Internal Server Error!',
    //   });
    // }
  }
}
