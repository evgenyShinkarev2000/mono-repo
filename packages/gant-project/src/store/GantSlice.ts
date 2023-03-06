import { createSlice } from "@reduxjs/toolkit"

const name = "gant";
interface GantSlice
{

}
const initialState: GantSlice = {

};
const rootSlice = createSlice({
  name,
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {

  }
});

export const gantReducer = rootSlice.reducer;
export const {} = rootSlice.actions;