import { types } from "sass";
import { Entity } from "./Entity";

type BaseStatus<T = string> = Entity & {
  name: T
}

export type Status = Entity & BaseStatus<string>;

const ToWork: Entity<1> & BaseStatus<"В работу"> = {
  id: 1,
  name: "В работу"
}

const Perfomed: Entity<2> & BaseStatus<"Выполняются"> = {
  id: 2,
  name: "Выполняются",
}

const Review: Entity<3> & BaseStatus<"Проверка"> = {
  id: 3,
  name: "Проверка",
}

const Testing: Entity<4> & BaseStatus<"Тестирование"> = {
  id: 4,
  name: "Тестирование",
}

const Compleated: Entity<5> & BaseStatus<"Завершенные"> = {
  id: 5,
  name: "Завершенные",
}

export const BaseStatuses = {
  ToWork,
  Perfomed,
  Review,
  Testing,
  Completed: Compleated,
}