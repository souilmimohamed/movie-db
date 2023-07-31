import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { types } from "../../model/enums";

export interface utilsState {
  isLoading: boolean;
  type: types;
}
const initialState = {
  isLoading: false,
  type: types.movie,
} as utilsState;

const utilsSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setIsLoading: (state: utilsState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    switchType: (state: utilsState, action: PayloadAction<types>) => {
      state.type = action.payload;
    },
  },
});

export const utilsReducer = utilsSlice.reducer;
export const { setIsLoading, switchType } = utilsSlice.actions;
