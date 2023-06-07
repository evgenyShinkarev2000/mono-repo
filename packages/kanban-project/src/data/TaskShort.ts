import { Entity } from "./Entity";
import { Person } from "./Person";
import { Project } from "./Project";
import { Status } from "./Status";
import { Tag } from "./Tag";

export type TaskShort = Entity & {
  title: string,
  status: Status,
  project: Project,
  tag: Tag,
  contractors: Person[],
  author: Person,
  responsible: Person,
  deadline: Date,
}