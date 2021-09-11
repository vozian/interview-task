import { v4 as uuid } from "uuid";

export let testData = {
  courseId: uuid(),
  userId: uuid(),
  addStudySession: {
    sessionId: uuid(),
    totalModulesStudied: 30,
    averageScore: 30,
    timeStudied: 3000
  },
  courseSessions: [
    {
      sessionId: uuid(),
      totalModulesStudied: 10,
      averageScore: 10,
      timeStudied: 2000
    }, {
      sessionId: uuid(),
      totalModulesStudied: 20,
      averageScore: 20,
      timeStudied: 1000
    }, {
      sessionId: uuid(),
      totalModulesStudied: 30,
      averageScore: 30,
      timeStudied: 3000
    }
  ],
  courseStat: {
    totalModulesStudied: 60,
    averageScore: 23.33333,
    timeStudied: 6000
  }
};
