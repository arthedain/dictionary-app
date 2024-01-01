import { HttpException, Inject, Injectable } from "@nestjs/common";
import { firstValueFrom, timeout } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(@Inject("AUTH") private readonly authClient: ClientProxy) {}
  async all(page, search) {
    return await firstValueFrom(
      this.authClient.send("all", { page, search }).pipe(timeout(5000)),
    ).catch((error) => {
      throw new HttpException(error.message, error.code);
    });
  }

  async create(createUserDto: CreateUserDto) {
    this.authClient.emit("create", {
      ...createUserDto,
    });
  }

  async update(id: number, userDto: UserDto) {
    this.authClient.emit("update", {
      id,
      ...userDto,
    });
  }

  async delete(id: number) {
    this.authClient.emit("delete", { id });
  }
}
