import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { VocabularyController } from "./vocabulary.controller";
import { VocabularyService } from "./vocabulary.service";
import { HttpModule } from "@nestjs/axios";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [VocabularyController],
  providers: [VocabularyService],
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: "VOCABULARY",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:admin@localhost:5672"],
          queue: "vocabulary_queue",
        },
      },
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
  ],
})
export class VocabularyModule {}
