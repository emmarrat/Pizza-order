import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOrders} from "../../features/pizza/pizzaThunks";
import {selectOrders, selectPizzaFetchLoading} from "../../features/pizza/pizzaSlice";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import Spinner from "../../components/Spinner/Spinner";
import AdminOrderCard from "../../components/AdminOderCard/AdminOrderCard";

const Orders = () => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector(selectOrders);
  const loading = useAppSelector(selectPizzaFetchLoading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  let content = (
    <>
    {ordersState.length === 0 ? <h2 className="text-center">Orders list is empty</h2> : ordersState.map((order) => (
       <AdminOrderCard key={order.id} order={order}/>
      ))}
    </>
  );

  if(loading){
    content = (<Spinner/>);
  }

  return (
    <>
      <NavbarAdmin/>
      <div className="container d-flex flex-column align-items-center">
      <h2 className="text-center mb-5">Orders:</h2>
        {content}
      </div>
    </>

  );
};

export default Orders;