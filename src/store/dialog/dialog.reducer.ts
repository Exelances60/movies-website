import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  options: {
    children: "Hİ",
  },
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    setDialog(state, action) {
      state.options = action.payload;
    },
  },
});

export const { setDialog } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog.options;

export const dialogReducer = dialogSlice.reducer;
