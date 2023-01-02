import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {fetchOrders, fetchPizza} from "../../features/pizza/pizzaThunks";

const Orders = () => {
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(fetchPizza());
    dispatch(fetchOrders());
  }, [dispatch]);

  // const makeOrder = () => {
  //   const newOrder = ordersState.map((order) => {
  //     const keys = Object.keys(order.order);
  //     return dishesState.find( dish => {
  //       return keys.forEach(key => {
  //         if (key === dish.id) {
  //           return  console.log(`${dish.name} x ${order.order[key]}`)
  //         }
  //       })
  //     });
  //
  //   });
  //   return newOrder;
  // }


  return (
    <div>
      Orders
    </div>
  );
};

export default Orders;