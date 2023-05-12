import { Project } from "@kanban/data/Project";
import { TaskShort } from "@kanban/data/TaskShort";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8050";

export const kanbanApi = createApi(
  {
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) =>
    {
      return {
        getShortTasks: builder.query<TaskShort[], void>({
          query: () => "task/short",
        }),
        getProject: builder.query<Project[], void>({
          query: () => "project",
        })
      }
    },
    reducerPath: "kanbanApi"
  }
);

const { useGetShortTasksQuery, useGetProjectQuery } = kanbanApi;
export const kanbanApiContainer = {
  useGetShortTasksQuery,
  useGetProjectQuery
}