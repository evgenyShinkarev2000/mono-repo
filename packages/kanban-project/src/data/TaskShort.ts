import { Enity } from "./Entity";
import { Person } from "./Person";
import { Project } from "./Project";
import { Status } from "./Status";
import { Tag } from "./Tag";

export class TaskShort extends Enity{
  public title: string;
  public status: Status;
  public project: Project;
  public tags: Tag[];
  public contractors: Person[];
  public author: Person;
  public deadline: Date;
}