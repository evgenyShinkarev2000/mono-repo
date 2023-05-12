import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const name = "kanban";
interface KanbanState
{
  projectFilter?: Project,
  taskExecutorFilter: "all" | "my",
}
const initialState: KanbanState = {
  taskExecutorFilter: "all",
};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{
    setProjectFilter: (options, action: PayloadAction<Project | undefined>) => {
      options.projectFilter = action.payload;
    }
  },
  extraReducers: (builder) => {

  }
});

export const kanbanReducer = rootSlice.reducer;
export const {setProjectFilter} = rootSlice.actions;
export const kanbanActionContainer = {
  setProjectFilter
}

