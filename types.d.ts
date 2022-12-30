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