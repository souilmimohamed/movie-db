import { combineReducers } from "@reduxjs/toolkit";
import { movieReducer } from "./movieSlice";
import { utilsReducer } from "./utilsSlice";

export const rootReducer = combineReducers({
  movies: movieReducer,
  utils: utilsReducer,
});
