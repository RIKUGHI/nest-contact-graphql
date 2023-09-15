import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<any> {
    const user = await this.prismaService.user.create({
      data: {
        username: registerInput.username,
        name: registerInput.name,
        password: await bcrypt.hash(registerInput.password, 10),
      },
    });

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<any> {
    const { username, password } = loginInput;

    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      access_token: this.jwtService.sign({ username, sub: user.id }),
      user,
    };
  }
}
