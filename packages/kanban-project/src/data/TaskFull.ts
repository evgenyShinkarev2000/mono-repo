import { Commentary } from "./Commentary";
import { Stage } from "./Stage";
import { TaskShort } from "./TaskShort";

export type TaskFull = TaskShort & {
  description: string,
  parentTask: TaskShort,
  plannedDates: {
    begin: Date,
    end: Date,
  },
  checkList: Stage[],
  wastedTime: Date,
  comments: Commentary[],
  isOnKanban: boolean,
}