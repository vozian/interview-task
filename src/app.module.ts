import { Module } from "@nestjs/common";
import { StatsModule } from "./stats/stats.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI")
      }),
      inject: [ConfigService]
    }),
    StatsModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
