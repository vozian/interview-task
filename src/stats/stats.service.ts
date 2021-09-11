import { Injectable } from "@nestjs/common";
import { AddSessionDto } from "./dto/add-session.dto";
import { InjectModel } from "@nestjs/mongoose";
import { StudySessionDocument, StudySessionEntity } from "./entities/study-session.entity";
import { Model } from "mongoose";
import { AggregatedStat, StatsAggregator } from "./stats.aggregator";

@Injectable()
export class StatsService {
  constructor(@InjectModel(StudySessionEntity.name) private statModel: Model<StudySessionDocument>) {
  }

  /** Persists a study session **/
  async addStudySession(
    userId: string,
    courseId: string,
    addSessionDto: AddSessionDto
  ): Promise<StudySessionEntity> {
    return this.statModel.create({
      userId,
      courseId,
      ...addSessionDto
    });
  }

  /** Fetches course lifetime statistics **/
  async getCourseStat(
    userId: string,
    courseId: string
  ): Promise<AggregatedStat> {
    let stats = await this.statModel.find({ userId, courseId });
    return StatsAggregator.aggregate(stats);
  }

  /** Fetches a single study session **/
  async getStudySession(
    userId: string,
    courseId: string,
    sessionId: string
  ): Promise<StudySessionEntity> {
    return this.statModel.findOne({ userId, courseId, sessionId });
  }
}
