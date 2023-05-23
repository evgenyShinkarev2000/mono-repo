import { Stage } from "./Stage";
import { Person } from "./Person";
import { TaskShort } from "./TaskShort";

export type TaskFull = TaskShort & {
  description: string,
  parentTask: TaskShort,
  plannedDates: {
    begin: Date,
    end: Date,
  },
  checkList: Stage[],
  wastedTimes: Array<{time: number, contractor: Person}>,
}