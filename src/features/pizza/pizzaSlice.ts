import {Pizza, PizzaApi} from "../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPizza, fetchOnePizza, fetchPizza, updatePizza} from "./pizzaThunks";

interface PizzaState {
  items: PizzaApi[];
  item: Pizza | null;
  fetchLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
}

const initialState: PizzaState = {
  items: [],
  item: null,
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
    builder.addCase(fetchPizza.pending, state => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPizza.fulfilled, (state, {payload: pizza}) => {
      state.fetchLoading = false;
      state.items = pizza;
    });
    builder.addCase(fetchPizza.rejected, state => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOnePizza.pending, state => {
      state.fetchLoading = true;
      state.item = null;
    });
    builder.addCase(fetchOnePizza.fulfilled, (state, {payload: pizza}) => {
      state.fetchLoading = false;
      state.item = pizza;
    });
    builder.addCase(fetchOnePizza.rejected, state => {
      state.fetchLoading = false;
    });
    builder.addCase(updatePizza.pending, state => {
      state.updateLoading = true;
    });
    builder.addCase(updatePizza.fulfilled, state => {
      state.updateLoading = false;
    });
    builder.addCase(updatePizza.rejected, state => {
      state.updateLoading = false;
    });
  }
});


export const pizzaReducer = pizzaSlice.reducer;

export const selectPizza = (state: RootState) => state.pizza.items;
export const selectOnePizza = (state: RootState) => state.pizza.item;
export const selectPizzaFetchLoading = (state: RootState) => state.pizza.fetchLoading;
export const selectPizzaDeleteLoading = (state: RootState) => state.pizza.deleteLoading;
export const selectPizzaCreateLoading = (state: RootState) => state.pizza.createLoading;
export const selectPizzaUpdateLoading = (state: RootState) => state.pizza.updateLoading;