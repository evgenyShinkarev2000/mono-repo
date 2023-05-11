import { kanbanApi } from './../../../kanban-project/src/store/Api';
import { configureStore } from "@reduxjs/toolkit";
import { kanbanReducer } from '@mono-repo/kanban-project';
import { rootReducer } from "@mono-repo/root-project";
import { gradeReducer } from "@mono-repo/grade-project";
import { gantReducer } from "@mono-repo/gant-project";


export const store = configureStore({
  reducer:{
    rootReducer,
    kanbanReducer,
    gradeReducer,
    gantReducer,
    [kanbanApi.reducerPath]: kanbanApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kanbanApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
