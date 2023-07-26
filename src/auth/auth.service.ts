import { HttpException, Inject, Injectable } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(@Inject("AUTH") private readonly authClient: ClientProxy) {}

  async register(registrationDto: RegistrationDto) {
    return await firstValueFrom(
      this.authClient.send("registration", registrationDto).pipe(timeout(5000)),
    ).catch((error) => {
      throw new HttpException(error.message, error.code);
    });
  }

  async login(loginDto: LoginDto) {
    return await firstValueFrom(
      this.authClient.send("login", loginDto).pipe(timeout(5000)),
    ).catch((error) => {
      throw new HttpException(error.message, error.code);
    });
  }

  async check(token: string) {
    return await firstValueFrom(
      this.authClient.send("check", token).pipe(timeout(5000)),
    ).catch((error) => {
      throw new HttpException(error.message, error.code);
    });
  }

  async getUser(token: string) {
    return await firstValueFrom(
      this.authClient.send("get-user", token).pipe(timeout(5000)),
    ).catch((error) => {
      throw new HttpException(error.message, error.code);
    });
  }
}
