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
  wastedTime: Date,
  comments: Commentary[],
  isOnKanban: boolean,
}