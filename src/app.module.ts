import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "./auth/auth.module";
import { VocabularyModule } from "./vocabulary/vocabulary.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "AUTH",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:admin@localhost:5672"],
          queue: "auth_queue",
        },
      },
    ]),
    AuthModule,
    VocabularyModule,
  ],
})
export class AppModule {}
