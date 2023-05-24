import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { Status } from "@kanban/data/Status";
import { TaskFull } from "@kanban/data/TaskFull";
import { TaskFullSerializable } from '@kanban/data/TaskFullSerializable';
import { TaskShortSerializable } from "@kanban/data/TaskShortSerializable";
import { ProjectGetResponse } from "@kanban/dto/ProjectGetResponse";
import { TaskFullGetResponse } from "@kanban/dto/TaskFullGetResponse";
import { TaskPutRequest } from "@kanban/dto/TaskPutRequest";
import { TaskShortGetResponse } from "@kanban/dto/TaskShortGetResponse";
import { SqlDateConverter } from "@kanban/utils/converters/SqlDateConverter";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://kaban/public/api";

export const kanbanApi = createApi(
  {
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["tasks"],
    endpoints: (builder) =>
    {
      return {
        getShortTasksSerializable: builder.query<TaskShortSerializable[], void>({
          query: () => "/tasks",
          providesTags: ["tasks"],
          transformResponse: (baseQuery: TaskShortGetResponse[]) =>
          {
            return baseQuery.map(dto => ({
              author: {
                id: dto.responsible_id,
                name: dto.responsible_first_name,
                surname: dto.responsible_last_name,
                patronymic: dto.responsible_patronymic
              },
              contractors: [],
              deadline: SqlDateConverter.toJs(dto.deadline).getMilliseconds(),
              id: dto.task_id,
              project: {
                id: dto.project_id,
                name: dto.project_name
              },
              tag: dto.team_tag,
              status: {
                id: dto.status_id,
                name: dto.status_name,
              },
              title: dto.task_name
            }));
          }
        }),
        getFullTaskSerializable: builder.query<TaskFullSerializable, number>({
          query: (taskId: number) => `tasks/${taskId}`,
          transformResponse: (dto: TaskFullGetResponse) =>
          {
            return {
              id: dto.task_id,
              author: {
                id: dto.responsible_id,
                name: dto.responsible_first_name,
                surname: dto.responsible_last_name,
                patronymic: dto.responsible_patronymic
              },
              checkList: dto.stages.map(s => ({ id: s.id, isCompleted: !!s.is_ready, title: s.description })),
              contractors: [],
              deadline: SqlDateConverter.toJs(dto.deadline).getMilliseconds(),
              description: dto.description,
              parentTask: {
                id: dto.parent_id
              } as unknown as TaskShortSerializable,
              plannedDates: {
                begin: SqlDateConverter.toJs(dto.planned_start_date).getMilliseconds(),
                end: SqlDateConverter.toJs(dto.planned_final_date).getMilliseconds(),
              },
              project: {
                id: dto.project_id,
                name: dto.project_name
              },
              tag: dto.team_tag,
              status: {
                id: dto.status_id,
                name: dto.status_name
              },
              title: dto.task_name,
              wastedTimes: [
                {
                  contractor: {
                    id: dto.responsible_id,
                    name: dto.responsible_first_name,
                    surname: dto.responsible_last_name,
                    patronymic: dto.responsible_patronymic
                  },
                  time: SqlDateConverter.toJs(dto.responsible_time_spent).getMilliseconds()
                }
              ],
              comments: dto.comments.map(comment => ({
                author: {
                  id: comment.author_id,
                  name: comment.author_first_name,
                  surname: comment.author_last_name,
                  patronymic: comment.author_patronymic,
                },
                content: comment.content,
                id: comment.id,
                time: null!, // позже напишу selector или hook
              })),
            }
          },
        }),
        patchTaskStatus: builder.mutation<TaskPutRequest, { taskId: number, newStatusId: number }>({
          query: (args) => (
            {
              url: `/tasks/${args.taskId}`,
              method: "Put",
              body: {
                status_id: args.newStatusId
              }
            }),
          invalidatesTags: ["tasks"]
        }),
        putFullTask: builder.mutation<TaskPutRequest, TaskFull>({
          query: () => ({
            url: "/tasks",
            method: "Put",
          }),
          invalidatesTags: ["tasks"]
        }),
        removeTaskFromKanban: builder.mutation<TaskPutRequest, number>({
          query: (taskId) => ({
            url: `/tasks/${taskId}`,
            method: "Put",
            body: {
              is_on_kanban: 0,
            }
          }),
          invalidatesTags: ["tasks"]
        }),
        getProjects: builder.query<Project[], void>({
          query: () => "/projects",
          transformResponse: (baseQuery: ProjectGetResponse[]) =>
          {
            return baseQuery.map(dto => ({
              id: dto.id,
              name: dto.title,
            }))
          },

        }),
        getCurrentUser: builder.query<Person, void>({
          query: () => "user/current",
        }),
      }
    },
    reducerPath: "kanbanApi"
  }
);


const {
  useGetShortTasksSerializableQuery,
  useGetProjectsQuery,
  useGetCurrentUserQuery,
  useGetFullTaskSerializableQuery,
  usePatchTaskStatusMutation,
  useRemoveTaskFromKanbanMutation,
} = kanbanApi;

export const kanbanApiContainer = {
  usePatchTaskStatusMutation,
  useGetShortTasksSerializableQuery,
  useGetProjectsQuery,
  useGetCurrentUserQuery,
  useGetFullTaskSerializableQuery,
  useRemoveTaskFromKanbanMutation,
}
