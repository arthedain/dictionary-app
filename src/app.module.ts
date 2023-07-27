import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { VocabularyModule } from "./vocabulary/vocabulary.module";
import authRabbitmqConfig from "./config/auth.rabbitmq.config";
import vocabularyRabbitmqConfig from "./config/vocabulary.rabbitmq.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authRabbitmqConfig, vocabularyRabbitmqConfig],
    }),
    AuthModule,
    VocabularyModule,
  ],
})
export class AppModule {}
