import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {cleanCard, selectCartPizza, selectTotalPrice, totalPrice} from "../../features/pizza/pizzaSlice";
import OrderCard from "../../components/OrderCard/OrderCard";
import {DELIVERY_PRICE} from "../../constants";
import {Link, useNavigate} from "react-router-dom";
import {createOrder} from "../../features/pizza/pizzaThunks";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartState = useAppSelector(selectCartPizza);
  const total = useAppSelector(selectTotalPrice);

  const makeOrder = async () => {
    const someOrder = Object.fromEntries(cartState.map(n => [n.pizza.id, n.amount]));
    await dispatch(createOrder(someOrder));
    await dispatch(cleanCard());
    await dispatch(totalPrice());
    navigate('/');
  };

  let btnActive = false;
  if (cartState.length === 0) {
    btnActive = true;
  }

  return (
    <>
      <Navbar/>
      <div className="container d-flex flex-column align-items-center">
        <div>
          <h2 className="text-center text-uppercase mb-5">Your order:</h2>
        </div>
        {cartState.length === 0 ? <h3 className="text-uppercase fw-bold">Your cart is empty</h3> : cartState.map(order => (
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
        <div className="d-flex justify-content-evenly w-50 px-2">
          <Link to="/" className="btn btn-lg btn-outline-danger px-5">Cancel</Link>
          <button disabled={btnActive} className="btn btn-lg btn-outline-success px-5" onClick={makeOrder}>Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;