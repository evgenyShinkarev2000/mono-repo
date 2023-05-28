import { Entity } from "./Entity";
import { Person } from "./Person";

export type CommentarySerializable = Partial<Entity> & {
  author: Person,
  content: string,
  time?: number,
}