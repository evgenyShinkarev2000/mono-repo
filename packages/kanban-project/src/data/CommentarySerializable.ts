import { Entity } from "./Entity";
import { Person } from "./Person";
import { TaskShort } from "./TaskShort";

export type CommentarySerializable = Partial<Entity> & {
  task: Pick<Required<TaskShort>, "id">,
  author: Person,
  content: string,
  time?: number,
}