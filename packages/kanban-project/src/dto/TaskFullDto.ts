import { CommentaryDto } from "./CommentaryDto";
import { StageDto } from "./StageDto";

export type TaskFullDto = {
  parent_id?: number,
  parent_name?: string,
  task_id?: number,
  task_name: string,
  project_id: number,
  project_name: string,
  team_id?: number,
  team_name?: string,
  team_tag: string,
  responsible_id: number,
  responsible_first_name: string,
  responsible_last_name: string,
  responsible_patronymic: string,
  responsible_time_spent: string, //00:00:00
  deadline: string, // 2019-03-28
  planned_start_date: string, // 2019-03-28
  planned_final_date: string, // 2019-03-28
  is_on_kanban: number,
  is_completed?: number,
  status_id: number,
  status_name: string,
  completed_at?: string, //хз какой формат, наверное 2019-03-28
  description: string,
  stages: StageDto[],
  comments: CommentaryDto[],
}