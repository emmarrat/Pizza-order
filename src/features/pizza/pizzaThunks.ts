import {createAsyncThunk} from "@reduxjs/toolkit";
import {Order, Orders, OrdersApi, Pizza, PizzaApi, PizzaListApi} from "../../../types";
import axiosApi from "../../axiosApi";

export const createPizza = createAsyncThunk<void, Pizza>(
  'pizza/create',
  async (pizza) => {
    await axiosApi.post('/pizza.json', pizza);
  }
);

export const fetchPizza = createAsyncThunk<PizzaApi[]>(
  'pizza/fetchAll',
  async () => {
    const pizzaResponse = await axiosApi.get<PizzaListApi | null>('/pizza.json');
    const pizzaList = pizzaResponse.data;

    let newPizzaList: PizzaApi[] = [];
    if (pizzaList) {
      newPizzaList = Object.keys(pizzaList).map(id => {
        const pizza = pizzaList[id];
        return {
          ...pizza,
          id
        }
      });
    }
    return newPizzaList;
  }
);

export const fetchOnePizza = createAsyncThunk<Pizza, string>(
  'pizza/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Pizza | null>('/pizza/' + id + '.json');
    const pizza = response.data;
    if (pizza === null) {
      throw new Error('Not found!');
    }
    return pizza;
  }
);

interface UpdatePizzaParams {
  id: string,
  pizza: Pizza,
}

export const updatePizza = createAsyncThunk<void, UpdatePizzaParams>(
  'pizza/update',
  async (params) => {
    await axiosApi.put('/pizza/' + params.id + '.json', params.pizza);
  }
);

export const removePizza = createAsyncThunk<void, string>(
  'pizza/remove',
  async (pizzaId) => {
    await axiosApi.delete('/pizza/' + pizzaId + '.json');
  }
);

export const createOrder = createAsyncThunk<void, Order>(
  'pizza/order',
  async (order) => {
    await axiosApi.post('/pizza-orders.json', order);
  }
);


export const fetchOrders = createAsyncThunk<Orders[]>(
  'pizza/fetchOrders',
  async () => {
    const ordersResponse = await axiosApi.get<OrdersApi | null>('/pizza-orders.json');
    const ordersList = ordersResponse.data;

    let newOrders: Orders[] = [];

    if (ordersList) {
      newOrders =  Object.keys(ordersList).map(id => {
        const order = ordersList[id];
        return {
          order: order,
          id
        }
      });
    }
    return newOrders;
  }
);