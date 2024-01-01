import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import authRabbitmqConfig from "../config/auth.rabbitmq.config";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule.forRoot({ load: [authRabbitmqConfig] }),
    ClientsModule.register([
      {
        name: "AUTH",
        transport: Transport.RMQ,
        options: authRabbitmqConfig(),
      },
    ]),
  ],
})
export class UserModule {}
