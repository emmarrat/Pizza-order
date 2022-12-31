import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, PizzaApi, PizzaListApi} from "../../../types";
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
     const pizzaResponse= await axiosApi.get<PizzaListApi | null>('/pizza.json');
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
)