import { Person } from "./Person";
import { Project } from "./Project";
import { Status } from "./Status";

export type TaskShortSerializable = {
  id: number,
  title: string;
  status: Status;
  project: Project;
  tag: string;
  contractors: Person[];
  author: Person;
  deadline: number;
}