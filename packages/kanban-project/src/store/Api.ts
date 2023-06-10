import { DefaultAppEnv } from './../../../root-project/src/AppEnv/DefaultAppEnv';
import { Commentary } from "@kanban/data/Commentary";
import { CommentarySerializable } from "@kanban/data/CommentarySerializable";
import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { Tag } from "@kanban/data/Tag";
import { TaskFull } from "@kanban/data/TaskFull";
import { TaskFullSerializable } from '@kanban/data/TaskFullSerializable';
import { TaskShortSerializable } from "@kanban/data/TaskShortSerializable";
import { CommentaryConverter } from "@kanban/dto/CommentaryConverter";
import { CommentaryDto } from "@kanban/dto/CommentaryDto";
import { ProjectGetResponse } from "@kanban/dto/ProjectGetResponse";
import { TagDto } from "@kanban/dto/TagDto";
import { TaskConverter } from "@kanban/dto/TaskConverter";
import { TaskFullDto } from "@kanban/dto/TaskFullDto";
import { TaskPutResponse } from "@kanban/dto/TaskPutResponse";
import { TaskShortGetResponse } from "@kanban/dto/TaskShortGetResponse";
import { UserDto } from "@kanban/dto/UserDto";
import { SqlDateConverter } from "@kanban/utils/converters/SqlDateConverter";
import { nameof } from "@kanban/utils/converters/nameof";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = DefaultAppEnv.kanbanApiUri;


const buildKanbanApiRemote = () => createApi(
  {
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["tasks", "openTask"],
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
              responsible: {
                id: dto.responsible_id,
                name: dto.responsible_first_name,
                surname: dto.responsible_last_name,
                patronymic: dto.responsible_patronymic
              },
              contractors: [],
              deadline: SqlDateConverter.toJs(dto.deadline).getTime(),
              id: dto.task_id,
              project: {
                id: dto.project_id,
                name: dto.project_name
              },
              tag: {
                id: dto.team_id,
                tag: dto.team_tag,
              },
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
          providesTags: ["openTask"],
          transformResponse: (dto: TaskFullDto) =>
          {
            return new TaskConverter().fullDtoToSerilizable(dto);
          },
        }),
        patchTaskStatus: builder.mutation<TaskPutResponse, { taskId: number, newStatusId: number }>({
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
        putFullTask: builder.mutation<TaskPutResponse, TaskFull>({
          query: (task: TaskFull) => ({
            url: `/tasks/${task.id}`,
            method: "Put",
            body: function(){
              const dto = new TaskConverter().fullModelToDto(task);
              const kostil: any = {
                ...dto,
              }

              delete kostil["project_name"];
              delete kostil["status_name"];
              delete kostil["responsible_id"];
              delete kostil["responsible_first_name"];
              delete kostil["responsible_last_name"];
              delete kostil["responsible_patronymic"];
              delete kostil["team_tag"];
              delete kostil["comments"];

              return kostil; //удалить после правок на сервере
            }(),
          }),
          invalidatesTags: ["tasks"]
        }),
        addFullTask: builder.mutation<TaskFullDto, TaskFull>({
          query: (task: TaskFull) => ({
            url: "/tasks",
            method: "Post",
            body: function(){
              const dto =  new TaskConverter().fullModelToDto(task);
              return {
                ...dto,
                [nameof<TaskFullDto>("stages")]: dto.stages.map(s => s.description)
              }
            }(),
          }),
          invalidatesTags: ["tasks"],
        }),
        removeTask: builder.mutation<TaskPutResponse, number>({
          query: (id) => ({
            url: `tasks/${id}`,
            method: "Post",
            body: {
              _method: "Delete",
            }
          }),
          invalidatesTags: ["tasks"]
        }),
        removeTaskFromKanban: builder.mutation<TaskPutResponse, number>({
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
        getUsers: builder.query<Person[], void>({
          query: () => "/users",
          transformResponse: (data: UserDto[]) =>
          {
            return data.map(user => ({
              id: user.id,
              name: user.first_name,
              surname: user.last_name,
              patronymic: user.patronymic
            }))
          },
        }),
        getTags: builder.query<Tag[], void>({
          query: () => "/teams",
          transformResponse: (data: TagDto[]) =>
          {
            return data.map(t => ({
              id: t.id,
              tag: t.teg,
            }))
          }
        }),
        addCommentary: builder.mutation<CommentarySerializable, Commentary>({
          query: (args) => ({
            url: "/comments",
            method: "Post",
            body: CommentaryConverter.toDto(args),
          }),
          invalidatesTags: ["openTask"],
          transformResponse: (dto: CommentaryDto) => {
            return CommentaryConverter.dtoToSerializable(dto);
          }
        }),
      }
    },
    reducerPath: "kanbanApi"
  }
);

export const kanbanApi = buildKanbanApiRemote();


const {
  useGetShortTasksSerializableQuery,
  useGetProjectsQuery,
  useGetFullTaskSerializableQuery,
  usePatchTaskStatusMutation,
  useRemoveTaskFromKanbanMutation,
  useGetTagsQuery,
  useGetUsersQuery,
  useAddFullTaskMutation,
  useAddCommentaryMutation,
  useRemoveTaskMutation,
  usePutFullTaskMutation
} = kanbanApi;

export const kanbanApiContainer = {
  usePatchTaskStatusMutation,
  useGetShortTasksSerializableQuery,
  useGetProjectsQuery,
  useGetFullTaskSerializableQuery,
  useRemoveTaskFromKanbanMutation,
  useGetTagsQuery,
  useGetUsersQuery,
  useAddFullTaskMutation,
  useAddCommentaryMutation,
  useRemoveTaskMutation,
  usePutFullTaskMutation,
}
