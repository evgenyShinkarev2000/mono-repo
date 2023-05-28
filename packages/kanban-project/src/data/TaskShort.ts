import { Entity } from "./Entity";
import { Person } from "./Person";
import { Project } from "./Project";
import { Status } from "./Status";

export type TaskShort = Partial<Entity> & {
  title: string;
  status: Status;
  project: Project;
  tag: string;
  contractors: Person[];
  author: Person;
  deadline: Date;
}