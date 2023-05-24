import { Entity } from "./Entity";

export type Stage = Entity & {
  isCompleted: boolean,
  title: string,
}