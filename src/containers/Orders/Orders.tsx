import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOrders} from "../../features/pizza/pizzaThunks";
import {selectOrders} from "../../features/pizza/pizzaSlice";

const Orders = () => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch])

  return (
    <div className="container">
      orders
      {ordersState.map(order => (
        <div key={Math.random()} className="card mb-2 p-2">
          {order.map(o => (
            <div key={Math.random()}> {o.name} x {o.amount} Total: {o.total} KGS</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;