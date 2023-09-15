import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        expiresIn: '1h',
      },
      secret: 'super-duper-secret',
    }),
  ],
  providers: [AuthService, AuthResolver, PrismaService, JwtStrategy],
})
export class AuthModule {}
