import React from 'react';
import {CartPizza} from "../../../types";
import {useAppDispatch} from "../../app/hooks";
import {removeFromCart, totalPrice} from "../../features/pizza/pizzaSlice";

interface Props {
  order: CartPizza
}

const OrderCard: React.FC<Props> = ({order}) => {
  const dispatch = useAppDispatch();
  const onRemove = () => {
    if (window.confirm('Please, confirm deleting selected pizza')) {
      dispatch(removeFromCart(order));
      dispatch(totalPrice());
    }
  }
  return (
    <div className="card w-50 mb-2 shadow bg-body rounded border-0">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          {order.pizza.name} x {order.amount}
        </div>
        <div className="d-flex align-items-center">
          <div className="me-5">
            Price: {order.pizza.price} KGS
          </div>
          <div>
            <button onClick={onRemove} className="btn btn-outline-danger">Remove</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderCard;