import { Stage } from "./Stage";
import { Person } from "./Person";
import { TaskShortSerializable as TaskShortSerializable } from "./TaskShortSerializable";

export type TaskFullSerializable = TaskShortSerializable & {
  description: string,
  parentTask: TaskShortSerializable,
  plannedDates: {
    begin: number,
    end: number,
  },
  checkList: Stage[],
  wastedTimes: Array<{time: number, contractor: Person}>,
}