import {PizzaApi} from "../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPizza} from "./pizzaThunks";

interface PizzaState {
  items: PizzaApi[];
  fetchLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
}

const initialState: PizzaState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createPizza.pending, state => {
      state.createLoading = true;
    });
    builder.addCase(createPizza.fulfilled, state => {
      state.createLoading = false;
    });
    builder.addCase(createPizza.rejected, state => {
      state.createLoading = false;
    });
  }
});


export const pizzaReducer = pizzaSlice.reducer;

export const selectPizza = (state: RootState) => state.pizza.items;
export const selectPizzaFetchLoading = (state: RootState) => state.pizza.fetchLoading;
export const selectPizzaDeleteLoading = (state: RootState) => state.pizza.deleteLoading;
export const selectPizzaCreateLoading = (state: RootState) => state.pizza.createLoading;
export const selectPizzaUpdateLoading = (state: RootState) => state.pizza.updateLoading;