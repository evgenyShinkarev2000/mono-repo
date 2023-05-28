import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { ExecutorFilter } from "@kanban/types/ExecutorFilter";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"

const name = "kanban";
interface KanbanState
{
  projectFilter?: Project,
  taskExecutorFilter: ExecutorFilter,
  currentUser: Person,
}
const initialState: KanbanState = {
  taskExecutorFilter: "Все задачи",
  currentUser: {
    id: 1,
    name: "Свой",
    surname: "Исполнитель",
    patronymic: "Отчестов",
  }
};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{
    setProjectFilter: (options, action: PayloadAction<Project | undefined>) => {
      options.projectFilter = action.payload;
    },
    setExecutorFilter: (options, action: PayloadAction<ExecutorFilter>) => {
      options.taskExecutorFilter = action.payload;
    }
  },
  extraReducers: (builder) => {

  }
});

export const kanbanReducer = rootSlice.reducer;
export const {setProjectFilter, setExecutorFilter} = rootSlice.actions;

