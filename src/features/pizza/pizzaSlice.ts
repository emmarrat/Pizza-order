import {CartPizza, Orders, Pizza, PizzaApi} from "../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPizza, fetchOnePizza, fetchOrders, fetchPizza, removePizza, updatePizza} from "./pizzaThunks";
import {DELIVERY_PRICE} from "../../constants";

interface PizzaState {
  items: PizzaApi[];
  item: Pizza | null;
  fetchLoading: boolean;
  removeLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  cart: CartPizza[];
  totalPrice: number;
  orders: Orders[];
}

const initialState: PizzaState = {
  items: [],
  item: null,
  fetchLoading: false,
  removeLoading: false,
  createLoading: false,
  updateLoading: false,
  cart: [],
  totalPrice: 0,
  orders: [],
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    addPizza: (state, {payload: pizza}: PayloadAction<PizzaApi>) => {
      const existingIndex = state.cart.findIndex(item => {
        return item.pizza.id === pizza.id;
      });
      if (existingIndex !== -1) {
        state.cart[existingIndex].amount++;
      } else {
        state.cart.push({pizza, amount: 1});
      }
    },
    totalPrice: (state) => {
      const totalPrice = state.cart.reduce((acc, pizza) => {
        return acc + (pizza.pizza.price * pizza.amount);
      }, 0);
      state.totalPrice = totalPrice + DELIVERY_PRICE;
    },
    removeFromCart: (state, {payload: order}: PayloadAction<CartPizza>) => {
      const removingIndex = state.cart.findIndex(item => {
        return item.pizza.id === order.pizza.id;
      });
      state.cart.splice(removingIndex, 1);
    },
    cleanCard: (state) => {
      state.cart = [];
    }
  },
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
    builder.addCase(removePizza.pending, (state, {meta: {arg: pizzaId}}) => {
      state.removeLoading = pizzaId;
    });
    builder.addCase(removePizza.fulfilled, state => {
      state.removeLoading = false;
    });
    builder.addCase(removePizza.rejected, state => {
      state.removeLoading = false;
    });
    builder.addCase(fetchOrders.pending, state => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: order}) => {
      state.fetchLoading = false;
      state.orders = order;
    });
    builder.addCase(fetchOrders.rejected, state => {
      state.fetchLoading = false;
    });

  }
});


export const pizzaReducer = pizzaSlice.reducer;

export const {addPizza, totalPrice, removeFromCart, cleanCard} = pizzaSlice.actions;


export const selectPizza = (state: RootState) => state.pizza.items;
export const selectOnePizza = (state: RootState) => state.pizza.item;
export const selectPizzaFetchLoading = (state: RootState) => state.pizza.fetchLoading;
export const selectPizzaRemoveLoading = (state: RootState) => state.pizza.removeLoading;
export const selectPizzaCreateLoading = (state: RootState) => state.pizza.createLoading;
export const selectPizzaUpdateLoading = (state: RootState) => state.pizza.updateLoading;

export const selectCartPizza = (state: RootState) => state.pizza.cart;
export const selectTotalPrice = (state: RootState) => state.pizza.totalPrice;
export const selectOrders = (state: RootState) => state.pizza.orders;