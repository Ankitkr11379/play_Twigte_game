import { createSlice } from "@reduxjs/toolkit";

export const cellSlice = createSlice({
  name: "cell",
  initialState: {
    start: [10, 10],
    end: [4, 46],
    walls: [],
    weights: [],
    visitedNodes: [],
    path: [],
    editWall: false,
    editWeight: false,
    eraseWall: false,
    eraseWeight: false,
  },
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setEnd: (state, action) => {
      state.end = action.payload;
    },
    addWall: (state, action) => {
      state.walls.push(action.payload);
    },
    removeWall: (state, action) => {
      const { row, col } = action.payload;
      state.walls = state.walls.filter(
        (wall) => wall.row !== row || wall.col !== col
      );
    },
    eraseWall: (state) => {
      state.walls = [];
    },
    eraseWeight: (state) => {
      state.weights = [];
    },
    addWeight: (state, action) => {
      state.weights.push(action.payload);
    },
    removeWeight: (state, action) => {
      const { row, col } = action.payload;
      state.weights = state.weights.filter(
        (weight) => weight.row !== row || weight.col !== col
      );
    },
    setVisitedNodes: (state, action) => {
      state.visitedNodes = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setEditWall: (state, action) => {
      state.editWall = action.payload;
    },
    setEditWeight: (state, action) => {
      state.editWeight = action.payload;
    },
    setEraseWall: (state, action) => {
      state.eraseWall = action.payload;
    },
    setEraseWeight: (state, action) => {
      state.eraseWeight = action.payload;
    },
  },
});

export const {
  addWall,
  removeWall,
  addWeight,
  removeWeight,
  setStart,
  setEnd,
  setVisitedNodes,
  setPath,
  setEditWall,
  setEditWeight,
  eraseWall,
  eraseWeight,
  setEraseWall,
  setEraseWeight,
} = cellSlice.actions;

export default cellSlice.reducer;
