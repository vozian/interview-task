import { Test } from "@nestjs/testing";
import { StatsService } from "../stats.service";
import { getModelToken } from "@nestjs/mongoose";
import { StudySessionEntity } from "../entities/study-session.entity";
import { StudySessionModelMock } from "./study-session.model.mock";
import { INestApplication } from "@nestjs/common";
import { testData } from "./test.data";

describe("StatsService", () => {
  let statService: StatsService;
  let app: INestApplication;

  let userId = testData.userId;
  let courseId = testData.courseId;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StatsService, {
        provide: getModelToken(StudySessionEntity.name),
        useValue: new StudySessionModelMock()
      }]
    }).compile();

    statService = moduleRef.get<StatsService>(StatsService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("add and get a study session", async () => {
    let addSessionDto = testData.addStudySession;

    await statService.addStudySession(userId, courseId, addSessionDto);
    let session = await statService.getStudySession(userId, courseId, addSessionDto.sessionId);
    expect(session).toEqual({ userId, courseId, ...addSessionDto });
  });

  it("get course stats", async () => {
    let courseSessions = testData.courseSessions;
    let courseStat = testData.courseStat;

    for (let session of courseSessions) {
      await statService.addStudySession(userId, courseId, session);
    }

    let stat = await statService.getCourseStat(userId, courseId);

    expect(stat.totalModulesStudied).toBe(courseStat.totalModulesStudied);
    expect(stat.timeStudied).toBe(courseStat.timeStudied);
    expect(stat.averageScore).toBeCloseTo(courseStat.averageScore, 2);
  });

  afterEach(async () => {
    await app.close();
  });
});