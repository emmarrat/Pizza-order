export interface Pizza {
  name: string;
  pic: string;
  price: number;
}

export interface PizzaApi extends Pizza {
  id: string;
}

export interface PizzaListApi {
  [id: string]: Pizza;
}

export interface PizzaMutation extends Pizza {
  price: string;
}

export interface Order {
  [id: string]: number;
}

export interface OrdersApi {
  [id: string]: Order;
}

export interface Orders {
  order: Order;
  id: string;
}

export interface CartPizza {
  pizza: PizzaApi;
  amount: number;
}

export interface FormattedOrder {
  name: string;
  amount: number;
  price: number;
  total: number;
}

export interface MergedOrder {
  id: string,
  total: number,
  order: formattedOrder[],
}
