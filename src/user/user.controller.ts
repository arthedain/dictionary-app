import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../guard/auth.guard";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller("/api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard)
  public async all(
    @Query("page") page: number,
    @Query("search") search: string,
  ) {
    return await this.userService.all(page ?? 1, search ?? "");
  }

  @Post("/create")
  @UseGuards(AuthGuard)
  public async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Post("/update/:id")
  @UseGuards(AuthGuard)
  public async update(@Param("id") id: number, @Body() userDto: UserDto) {
    await this.userService.update(id, userDto);
  }
  @Post("/delete/:id")
  @UseGuards(AuthGuard)
  public async delete(@Param("id") id: number) {
    await this.userService.delete(id);
  }
}
