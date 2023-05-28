import { Entity } from "./Entity";

export type Stage = Partial<Entity> & {
  isCompleted: boolean,
  title: string,
}