import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { Tag } from "@kanban/data/Tag";
import { TaskFull } from "@kanban/data/TaskFull";
import { TaskFullSerializable } from '@kanban/data/TaskFullSerializable';
import { TaskShortSerializable } from "@kanban/data/TaskShortSerializable";
import { ProjectGetResponse } from "@kanban/dto/ProjectGetResponse";
import { TagDto } from "@kanban/dto/TagDto";
import { TaskConverter } from "@kanban/dto/TaskConverter";
import { TaskFullDto } from "@kanban/dto/TaskFullDto";
import { TaskPutResponse } from "@kanban/dto/TaskPutResponse";
import { TaskShortGetResponse } from "@kanban/dto/TaskShortGetResponse";
import { UserDto } from "@kanban/dto/UserDto";
import { SqlDateConverter } from "@kanban/utils/converters/SqlDateConverter";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// const baseUrl = "http://localhost:8050";

// export const kanbanApi = createApi(
//   {
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     tagTypes: ["tasks"],
//     endpoints: (builder) =>
//     {
//       return {
//         getShortTasksSerializable: builder.query<TaskShortSerializable[], void>({
//           query: () => "/tasks",
//           providesTags: ["tasks"],
//         }),
//         getFullTaskSerializable: builder.query<TaskFullSerializable, number>({
//           query: (taskId: number) => `tasks/${taskId}`,
//         }),
//         patchTaskStatus: builder.mutation<TaskPutRequest, { taskId: number, newStatusId: number }>({
//           query: (args) => (
//             {
//               url: `/tasks/${args.taskId}`,
//               method: "Put",
//               body: {
//                 status_id: args.newStatusId
//               }
//             }),
//           invalidatesTags: ["tasks"]
//         }),
//         putFullTask: builder.mutation<TaskPutRequest, TaskFull>({
//           query: () => ({
//             url: "/tasks",
//             method: "Put",
//           }),
//           invalidatesTags: ["tasks"]
//         }),
//         removeTaskFromKanban: builder.mutation<TaskPutRequest, number>({
//           query: (taskId) => ({
//             url: `/tasks/${taskId}`,
//             method: "Put",
//             body: {
//               is_on_kanban: 0,
//             }
//           }),
//           invalidatesTags: ["tasks"]
//         }),
//         getProjects: builder.query<Project[], void>({
//           query: () => "/projects",
//         }),
//         getCurrentUser: builder.query<Person, void>({
//           query: () => "user/current",
//         }),
//       }
//     },
//     reducerPath: "kanbanApi"
//   }
// );


// const {
//   useGetShortTasksSerializableQuery,
//   useGetProjectsQuery,
//   useGetCurrentUserQuery,
//   useGetFullTaskSerializableQuery,
//   usePatchTaskStatusMutation,
//   useRemoveTaskFromKanbanMutation,
// } = kanbanApi;

// export const kanbanApiContainer = {
//   usePatchTaskStatusMutation,
//   useGetShortTasksSerializableQuery,
//   useGetProjectsQuery,
//   useGetCurrentUserQuery,
//   useGetFullTaskSerializableQuery,
//   useRemoveTaskFromKanbanMutation,
// }






const baseUrl = import.meta.env.VITE_KANBAN_API_URI;

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
              responsible: {
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
            url: "/tasks",
            method: "Put",
            body: new TaskConverter().fullModelToDto(task),
          }),
          invalidatesTags: ["tasks"]
        }),
        addFullTask: builder.mutation<TaskFullDto, TaskFull>({
          query: (task: TaskFull) => ({
            url: "/tasks",
            method: "Post",
            body: new TaskConverter().fullModelToDto(task),
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
  useGetTagsQuery,
  useGetUsersQuery,
  useAddFullTaskMutation,
} = kanbanApi;

export const kanbanApiContainer = {
  usePatchTaskStatusMutation,
  useGetShortTasksSerializableQuery,
  useGetProjectsQuery,
  useGetCurrentUserQuery,
  useGetFullTaskSerializableQuery,
  useRemoveTaskFromKanbanMutation,
  useGetTagsQuery,
  useGetUsersQuery,
  useAddFullTaskMutation,
}
