import { StudySessionEntity } from "./entities/study-session.entity";

export interface AggregatedStat {
  totalModulesStudied: number,
  averageScore: number,
  timeStudied: number
}


/**
 * Aggregates 2 stats
 */
function combineStats(prev: AggregatedStat, curr: AggregatedStat): AggregatedStat {
  return {
    totalModulesStudied: prev.totalModulesStudied + curr.totalModulesStudied,
    timeStudied: prev.timeStudied + curr.timeStudied,
    averageScore: (prev.averageScore * prev.totalModulesStudied + curr.averageScore * curr.totalModulesStudied) /
      (prev.totalModulesStudied + curr.totalModulesStudied)
  };
}

/**
 * Aggregates a stat list
 */
export namespace StatsAggregator {
  export function aggregate(stats: StudySessionEntity[]): AggregatedStat {
    return stats.reduce(combineStats,  {
      totalModulesStudied: 0,
      averageScore: 0,
      timeStudied: 0
    })
  }
}