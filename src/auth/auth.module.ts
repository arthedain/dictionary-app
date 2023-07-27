import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import authRabbitmqConfig from "../config/auth.rabbitmq.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
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
  exports: [AuthService],
})
export class AuthModule {}
