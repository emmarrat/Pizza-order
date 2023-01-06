import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  FormattedOrder,
  MergedOrder,
  OrderClient,
  OrdersApi,
  OrdersClient,
  Pizza,
  PizzaApi,
  PizzaListApi
} from "../../../types";
import axiosApi from "../../axiosApi";
import {DELIVERY_PRICE} from "../../constants";

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

export const createOrder = createAsyncThunk<void, OrderClient>(
  'pizza/order',
  async (order) => {
    await axiosApi.post('/pizza-orders.json', order);
  }
);


export const fetchOrders = createAsyncThunk<MergedOrder[]>(
  'pizza/fetchOrders',
  async () => {
    const ordersResponse = await axiosApi.get<OrdersApi | null>('/pizza-orders.json');
    const ordersList = ordersResponse.data;
    const pizzaResponse = await axiosApi.get<PizzaListApi | null>('/pizza.json');
    const pizzaList = pizzaResponse.data;
    let newOrders: OrdersClient[] = [];
    let newPizzaList: PizzaApi[] = [];

    if (ordersList) {
      newOrders = Object.keys(ordersList).map(id => {
        const order = ordersList[id];
        return {
          order: order,
          id
        }
      });
    }

    if (pizzaList) {
      newPizzaList = Object.keys(pizzaList).map(id => {
        const pizza = pizzaList[id];
        return {
          ...pizza,
          id
        }
      });
    }

    const mergedOrder: MergedOrder[] = [];
    let total: number = 0;

    for (const order of newOrders) {
      const ordersArray: FormattedOrder[] = [];
      for (const [dishId, amount] of Object.entries(order.order.order)) {
        const dish = newPizzaList.find(dish => dish.id === dishId);

        if (dish) {
          const orderItem = {
            name: dish.name,
            amount,
            price: dish.price,
            total: dish.price * amount
          };
          ordersArray.push(orderItem)
        }
      }
      total = ordersArray.reduce((acc, order) => {
        return acc + order.total;
      }, 0)
      const orderObj = {
        order: ordersArray,
        id: order.id,
        total: total + DELIVERY_PRICE,
        client: order.order.client
      }
      mergedOrder.push(orderObj);
    }
    return mergedOrder;
  }
);

export const removeOrder = createAsyncThunk<void, string>(
  'pizza/removeOrder',
  async (orderId) => {
    await axiosApi.delete('/pizza-orders/' + orderId + '.json');
  }
);