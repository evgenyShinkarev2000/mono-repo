import { TaskFull } from "@kanban/data/TaskFull";
import { TaskFullSerializable } from "@kanban/data/TaskFullSerializable";
import { TaskShortSerializable } from "@kanban/data/TaskShortSerializable";
import { SqlDateConverter } from "@kanban/utils/converters/SqlDateConverter";
import { TaskFullDto } from "./TaskFullDto";
import { TimeOnly } from "@kanban/utils/TimeOnly";
import { CommentaryConverter } from "./CommentaryConverter";

export class TaskConverter
{
  public fullDtoToSerilizable(dto: TaskFullDto): TaskFullSerializable
  {
    return {
      id: dto.task_id!,
      author: {
        id: dto.responsible_id,
        name: dto.responsible_first_name,
        surname: dto.responsible_last_name,
        patronymic: dto.responsible_patronymic
      },
      responsible: {
        id: dto.responsible_id,
        name: dto.responsible_first_name,
        surname: dto.responsible_last_name,
        patronymic: dto.responsible_patronymic
      },
      checkList: dto.stages.map(s => ({ id: s.id, isCompleted: !!s.is_ready, title: s.description })),
      contractors: [],
      deadline: SqlDateConverter.toJs(dto.deadline ?? Date.now()).getTime(),
      description: dto.description,
      parentTask: dto.parent_id ? {id: dto.parent_id, title: dto.parent_name!} : undefined,
      plannedDates: {
        begin: SqlDateConverter.toJs(dto.planned_start_date).getTime(),
        end: SqlDateConverter.toJs(dto.planned_final_date).getTime(),
      },
      project: {
        id: dto.project_id,
        name: dto.project_name
      },
      tag: {
        id: dto.team_id!,
        tag: dto.team_tag,
      },
      status: {
        id: dto.status_id,
        name: dto.status_name
      },
      title: dto.task_name,
      wastedTime: TimeOnly.parseFromString(dto.responsible_time_spent).toSeconds(),
      isOnKanban: !!dto.is_on_kanban,
      comments: dto.comments.map(c => CommentaryConverter.dtoToSerializable(c)),
    }
  }

  public fullModelToDto(task: TaskFull): TaskFullDto
  {
    return {
      task_id: task.id!,
      task_name: task.title,
      description: task.description,
      deadline: SqlDateConverter.toSql(task.deadline),
      is_on_kanban: task.isOnKanban ? 1 : 0,
      project_id: task.project.id,
      project_name: task.project.name,
      status_id: task.status.id,
      status_name: task.status.name,
      responsible_id: task.responsible.id,
      responsible_first_name: task.responsible.name,
      responsible_last_name: task.responsible.surname,
      responsible_patronymic: task.responsible.patronymic,
      responsible_time_spent: task.wastedTime.toString(),
      team_id: task.tag?.id,
      team_tag: task.tag?.tag,
      planned_start_date: SqlDateConverter.toSql(task.plannedDates.begin),
      planned_final_date: SqlDateConverter.toSql(task.plannedDates.end),
      stages: task.checkList?.map(stage =>
      {
        if (stage.id)
        {
          return {
            id: stage.id,
            description: stage.title,
            is_ready: stage.isCompleted ? 1 : 0,
          }
        }

        return {
          description: stage.title,
          is_ready: stage.isCompleted ? 1 : 0,
        }
      }),
      comments: task.comments?.map(comment => CommentaryConverter.toDto(comment)),
    }
  }
}