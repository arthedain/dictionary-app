import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  UseGuards,
  Header,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegistrationDto } from "./dto/registration.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "../guard/auth.guard";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  async registration(@Body() registrationDto: RegistrationDto) {
    return await this.authService.register(registrationDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("check")
  @UseGuards(AuthGuard)
  async check(@Headers("token") token: string) {
    return await this.authService.check(token);
  }

  @Get("user")
  @UseGuards(AuthGuard)
  async getUser(@Headers("token") token: string) {
    return await this.authService.getUser(token);
  }
}
