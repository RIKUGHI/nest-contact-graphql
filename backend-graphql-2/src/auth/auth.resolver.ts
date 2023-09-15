import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response.dto';
import { RegisterInput } from './dto/register.input';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async register(@Args('register') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponse)
  async Login(@Args('login') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
