import { TimeOnly } from "@kanban/utils/TimeOnly";
import { Commentary } from "./Commentary";
import { Stage } from "./Stage";
import { TaskShort } from "./TaskShort";

export type TaskFull = TaskShort & {
  description: string,
  parentTask?: Pick<TaskShort, "id" | "title">,
  plannedDates: {
    begin: Date,
    end: Date,
  },
  checkList: Stage[],
  wastedTime: TimeOnly,
  comments: Commentary[],
  isOnKanban: boolean,
}