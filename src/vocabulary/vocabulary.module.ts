import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { VocabularyController } from "./vocabulary.controller";
import { VocabularyService } from "./vocabulary.service";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "../auth/auth.module";
import vocabularyRabbitmqConfig from "../config/vocabulary.rabbitmq.config";
import authRabbitmqConfig from "../config/auth.rabbitmq.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [VocabularyController],
  providers: [VocabularyService],
  imports: [
    ConfigModule.forRoot({
      load: [authRabbitmqConfig, vocabularyRabbitmqConfig],
    }),
    HttpModule,
    ClientsModule.register([
      {
        name: "VOCABULARY",
        transport: Transport.RMQ,
        options: vocabularyRabbitmqConfig(),
      },
      {
        name: "AUTH",
        transport: Transport.RMQ,
        options: authRabbitmqConfig(),
      },
    ]),
    AuthModule,
  ],
})
export class VocabularyModule {}
