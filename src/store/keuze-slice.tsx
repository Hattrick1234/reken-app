import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface keuzeState {
  tijdconditieVanToepassing: boolean;
  tijdconditieAantalMinuten: number;
  tijdconditieAantalSeconden: number;
}

// Define the initial state using that type
const initialState: keuzeState = {
  tijdconditieVanToepassing: false,
  tijdconditieAantalMinuten: 5,
  tijdconditieAantalSeconden: 0,
};

const keuzeSlice = createSlice({
  name: "keuze",
  initialState: initialState,
  reducers: {
    toggleTijdconditieVanToepassing(state) {
      state.tijdconditieVanToepassing = !state.tijdconditieVanToepassing;
    },
    setTijdconditieAantalMinuten: (state, action) => {
      state.tijdconditieAantalMinuten = action.payload;
    },
    setTijdconditieAantalSeconden: (state, action) => {
      state.tijdconditieAantalSeconden = action.payload;
    },
  },
});

export const keuzeActions = keuzeSlice.actions;
export const { toggleTijdconditieVanToepassing } = keuzeSlice.actions;

export default keuzeSlice;
