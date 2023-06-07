import { CommentarySerializable } from "./CommentarySerializable";
import { Stage } from "./Stage";
import { TaskShortSerializable } from "./TaskShortSerializable";

export type TaskFullSerializable = TaskShortSerializable & {
  description: string,
  parentTask?: Pick<TaskShortSerializable, "id" | "title">,
  plannedDates: {
    begin: number,
    end: number,
  },
  checkList: Stage[],
  wastedTime: number,
  comments: CommentarySerializable[],
  isOnKanban: boolean,
}