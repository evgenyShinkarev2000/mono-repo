import { Entity } from "./Entity";

export type CheckListItem = Entity & {
  isCompleted: boolean,
  title: string,
}