import { createSlice } from "@reduxjs/toolkit";

export const algoSlice = createSlice({
  name: "algo",
  initialState: {
    algorithm: null,
    maze: null,
  },
  reducers: {
    setAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
    setMaze: (state, action) => {
      state.maze = action.payload;
    },
  },
});

export const { setAlgorithm, setMaze } = algoSlice.actions;

export default algoSlice.reducer;
