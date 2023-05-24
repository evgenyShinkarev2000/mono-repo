import { Entity } from "./Entity";
import { Person } from "./Person";

export type Commentary = Entity & {
  author: Person,
  content: string,
  time: Date,
}