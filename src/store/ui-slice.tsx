import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface uiState {
  toonSomOnderElkaar: boolean;
}

// Define the initial state using that type
const initialState: uiState = {
  toonSomOnderElkaar: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState, //{ toonSomOnderElkaar: false },
  reducers: {
    wisselWeergaveOnderOfNaastElkaar(state) {
      state.toonSomOnderElkaar = !state.toonSomOnderElkaar;
    },
  },
});

export const uiActions = uiSlice.actions;
export const { wisselWeergaveOnderOfNaastElkaar } = uiSlice.actions;

export default uiSlice;
