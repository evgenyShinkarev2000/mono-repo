import { Stage } from "./Stage";
import { Person } from "./Person";
import { TaskShort } from "./TaskShort";
import { Commentary } from "./Commentary";

export type TaskFull = TaskShort & {
  description: string,
  parentTask: TaskShort,
  plannedDates: {
    begin: Date,
    end: Date,
  },
  checkList: Stage[],
  wastedTimes: Array<{time: number, contractor: Person}>,
  comments: Commentary[],
}