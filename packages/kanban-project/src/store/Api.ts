import { TaskShort } from "@kanban/data/TaskShort";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8050";

export const kanbanApi = createApi(
  {
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) =>
    {
      return {
        getShortTasks: builder.query<TaskShort[], unknown>({
          query: () => "task/short",
        }),
      }
    },
    reducerPath: "kanbanApi"
  }
);

const {useGetShortTasksQuery} = kanbanApi;
export const kanbanApiContainer = {
  useGetShortTasksQuery,
}