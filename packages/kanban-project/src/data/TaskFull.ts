import { TimeOnly } from "@kanban/utils/TimeOnly";
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
  wastedTime: TimeOnly,
  comments: Commentary[],
  isOnKanban: boolean,
}