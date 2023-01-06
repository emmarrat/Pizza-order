import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {cleanCard, selectCartPizza, selectTotalPrice, totalPrice} from "../../features/pizza/pizzaSlice";
import OrderCard from "../../components/OrderCard/OrderCard";
import {DELIVERY_PRICE} from "../../constants";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../../features/pizza/pizzaThunks";
import OrderForm from "../../components/OrderForm/OrderForm";
import {OrderClient} from "../../../types";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartState = useAppSelector(selectCartPizza);
  const total = useAppSelector(selectTotalPrice);

  const makeOrder = async (order: OrderClient) => {
    await dispatch(createOrder(order));
    await dispatch(cleanCard());
    await dispatch(totalPrice());
    navigate('/');
  };

  return (
    <>
      <Navbar/>
      <div className="container d-flex flex-column align-items-center">
        <div>
          <h2 className="text-center text-uppercase mb-5">Your order:</h2>
        </div>
        {cartState.length === 0 ?
          <h3 className="text-uppercase fw-bold">Cart is empty</h3> : cartState.map(order => (
            <OrderCard key={order.pizza.id} order={order}/>
          ))}
        <div className="d-flex justify-content-between w-50 px-2 mt-5">
          <p>Delivery fixed price:</p>
          <p className="fw-bold">{DELIVERY_PRICE} KGS</p>
        </div>
        <div className="d-flex justify-content-between w-50 px-2 mt-2 fw-bold">
          <p>Total:</p>
          <p className="text-decoration-underline">{total} KGS</p>
        </div>
        <div>
          <OrderForm onSubmit={makeOrder}/>
        </div>
      </div>
    </>
  );
};

export default Checkout;