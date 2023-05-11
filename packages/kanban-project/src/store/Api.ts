import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8050";

const api = createApi(
  {
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => {
      return {

      }
    },
    reducerPath: "kanbanApi"
  }
);