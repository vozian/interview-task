import { Controller, Post, Body, Param, Headers, Get } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { AddSessionDto } from "./dto/add-session.dto";
import { AggregatedStat } from "./stats.aggregator";

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {
  }

  /** Persists a study session  **/
  @Post("/courses/:courseId")
  async addSessionEvent(
    @Headers("X-User-Id") userId: string,
    @Param("courseId") courseId: string,
    @Body() addSessionDto: AddSessionDto
  ) {
    await this.statsService.addStudySession(userId, courseId, addSessionDto);
  }

  /** Fetches course lifetime statistics **/
  @Get("/courses/:courseId")
  async getSingleCourseStats(
    @Headers("X-User-Id") userId: string,
    @Param("courseId") courseId: string,
    @Body() addSessionDto: AddSessionDto
  ): Promise<AggregatedStat> {
    return this.statsService.getCourseStat(userId, courseId);
  }

  /** Fetches a single study session **/
  @Get("/courses/{courseId}/sessions/{sessionId}")
  async getStudySession(
    @Headers("X-User-Id") userId: string,
    @Param("courseId") courseId: string,
    @Param("sessionId") sessionId: string
  ): Promise<AggregatedStat> {
    return this.statsService.getStudySession(userId, courseId, sessionId);
  }

}
