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

export interface Client {
  name: string;
  phone: string;
  address: string;
}

export interface OrderClient {
  order: Order;
  client: Client;
}

export interface OrdersApi {
  [id: string]: OrderClient;
}

export interface OrdersClient {
  order: OrderClient;
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
  id: string;
  total: number;
  order: formattedOrder[];
  client: Client;
}


