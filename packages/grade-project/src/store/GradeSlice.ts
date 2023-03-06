import { createSlice } from "@reduxjs/toolkit"

const name = "grade";
interface GradeState
{

}
const initialState: GradeState = {

};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {

  }
});

export const gradeReducer = rootSlice.reducer;
export const {} = rootSlice.actions;