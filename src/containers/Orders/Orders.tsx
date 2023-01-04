import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOrders, removeOrder} from "../../features/pizza/pizzaThunks";
import {selectOrders} from "../../features/pizza/pizzaSlice";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import {DELIVERY_PRICE} from "../../constants";

const Orders = () => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const deleteOrder = async (id: string) => {
      await dispatch(removeOrder(id));
      await dispatch(fetchOrders());
  };

  return (
    <>
      <NavbarAdmin/>
      <div className="container d-flex flex-column align-items-center">
      <h2 className="text-center mb-5">Orders:</h2>
        {ordersState.length === 0 ? <h2 className="text-center">Orders list is empty</h2> : ordersState.map((order) => (
          <div key={Math.random()} onClick={() =>deleteOrder(order.id)} className="card mb-2 p-2 w-50">
            {order.order.map(o => (
              <div key={Math.random()} className="d-flex align-items-center justify-content-between">
                <p className="mb-0"> {o.name} x {o.amount}</p>
                <p className="mb-0"> {o.total} KGS</p>
              </div>
            ))}
            <hr/>
            <p className="mb-0">Delivery price: <strong>{DELIVERY_PRICE} KGS</strong> </p>
            <p className="fw-bolder mb-0">Grand total for the order: {order.total} KGS</p>
            <button className="btn btn-outline-success mt-2">Complete order</button>
          </div>
        ))}
      </div>
    </>

  );
};

export default Orders;