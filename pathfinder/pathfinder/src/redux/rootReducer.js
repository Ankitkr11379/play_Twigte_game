import { combineReducers } from "redux";
import cellReducer from "./Slices/cellSlice";
import algoReducer from "./Slices/algoSlice";

const rootReducer = combineReducers({
  algo: algoReducer,
  cell: cellReducer,
});

export default rootReducer;
