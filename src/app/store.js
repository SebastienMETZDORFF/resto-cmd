import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../features/cart/cartSlice";
import { ownerSlice } from "../features/owner/ownerSlice";
import { notesSlice } from "../features/notes/notesSlice";

let state = {
  owner: {},
  list: [],
};

export const store = configureStore({
  preloadedState: state,
  reducer: combineReducers({
    owner: ownerSlice.reducer,
    list: cartSlice.reducer,
    notes: notesSlice.reducer,
  }),
});
