import { Stage } from "./Stage";
import { Person } from "./Person";
import { TaskShortSerializable as TaskShortSerializable } from "./TaskShortSerializable";
import { Commentary } from "./Commentary";
import { CommentarySerializable } from "./CommentarySerializable";

export type TaskFullSerializable = TaskShortSerializable & {
  description: string,
  parentTask: TaskShortSerializable,
  plannedDates: {
    begin: number,
    end: number,
  },
  checkList: Stage[],
  wastedTime: number,
  comments: CommentarySerializable[],
  isOnKanban: boolean,
}