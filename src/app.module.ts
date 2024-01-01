import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { VocabularyModule } from "./vocabulary/vocabulary.module";
import authRabbitmqConfig from "./config/auth.rabbitmq.config";
import vocabularyRabbitmqConfig from "./config/vocabulary.rabbitmq.config";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authRabbitmqConfig, vocabularyRabbitmqConfig],
    }),
    AuthModule,
    VocabularyModule,
    UserModule,
  ],
})
export class AppModule {}
