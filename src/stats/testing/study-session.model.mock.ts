import { StudySessionEntity } from "../entities/study-session.entity";

export class StudySessionModelMock {
  private data: StudySessionEntity[] = [];

  create(studySession: StudySessionEntity) {
    this.data.push(studySession);
    return studySession;
  }

  find({ userId, courseId }) {
    return this.data.filter(it => it.courseId === courseId && it.userId === userId);
  }

  findOne({ userId, courseId, sessionId }) {
    return this.data.find(it => it.sessionId == sessionId &&
      it.courseId === courseId && it.userId === userId);
  }
}