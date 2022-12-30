import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza} from "../../../types";
import axiosApi from "../../axiosApi";

export const createPizza = createAsyncThunk<void, Pizza>(
  'dishes/create',
  async (pizza) => {
    await axiosApi.post('/pizza.json', pizza);
  }
);