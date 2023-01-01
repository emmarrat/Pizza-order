export interface Pizza {
  name: string;
  pic: string;
  price: number;
}
export interface PizzaApi extends Pizza{
  id: string;
}

export interface PizzaListApi {
  [id: string]: Pizza;
}

export interface PizzaMutation extends Pizza{
  price: string;
}

export interface CartPizza {
  pizza: PizzaApi;
  amount: number;
}