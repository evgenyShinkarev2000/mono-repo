import { CheckListItem } from "./CheckListItem";
import { Person } from "./Person";
import { TaskShort } from "./TaskShort";

export type TaskFull = TaskShort & {
  description: string,
  parentTask: TaskShort,
  plannedDates: {
    begin: Date,
    end: Date,
  },
  checkList: CheckListItem[],
  wastedTimes: Array<{time: number, contractor: Person}>,
}