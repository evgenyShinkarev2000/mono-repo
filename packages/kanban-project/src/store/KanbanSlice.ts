import { createSlice } from "@reduxjs/toolkit"

const name = "kanban";
interface KanbanState
{

}
const initialState: KanbanState = {

};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {

  }
});

export const kanbanReducer = rootSlice.reducer;
export const {} = rootSlice.actions;