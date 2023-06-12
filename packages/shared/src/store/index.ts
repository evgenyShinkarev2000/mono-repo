import { kanbanApi } from './../../../kanban-project/src/store/Api';
import { configureStore } from "@reduxjs/toolkit";
import { kanbanReducer } from '@mono-repo/kanban-project';
import { rootReducer } from "@mono-repo/root-project";
import { AuthApi, authReducer, uralInernApi } from "@mono-repo/grade-project";


export const store = configureStore({
  reducer: {
    rootReducer,
    kanbanReducer,
    auth: authReducer,
    [kanbanApi.reducerPath]: kanbanApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [uralInernApi.reducerPath]: uralInernApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(kanbanApi.middleware)
    .concat(AuthApi.middleware)
    .concat(uralInernApi.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
