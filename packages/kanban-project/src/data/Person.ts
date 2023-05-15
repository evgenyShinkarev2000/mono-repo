import { Entity as Entity } from "./Entity";

export type Person = Entity & {
  name: string;
  surname: string;
  patronymic: string;
}