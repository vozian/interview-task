import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StudySessionEntity, StudySessionSchema } from "./entities/study-session.entity";

@Module({
  imports: [MongooseModule.forFeature([
    { name: StudySessionEntity.name, schema: StudySessionSchema }
  ])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {
}
