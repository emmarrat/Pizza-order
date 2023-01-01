import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCartPizza, selectPizza, selectPizzaFetchLoading} from "../../features/pizza/pizzaSlice";
import {fetchPizza} from "../../features/pizza/pizzaThunks";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import Navbar from "../../components/Navbar/Navbar";
import {Link} from "react-router-dom";
import {DELIVERY_PRICE} from "../../constants";

const Home = () => {
  const dispatch = useAppDispatch();
  const pizzaState = useAppSelector(selectPizza);
  const fetchLoading = useAppSelector(selectPizzaFetchLoading);
  const cartState = useAppSelector(selectCartPizza);

  useEffect(() => {
    dispatch(fetchPizza());
  }, [dispatch]);

  const totalPrice = cartState.reduce((acc, pizza) => {
     return acc + (pizza.pizza.price * pizza.amount);
  }, 0);



  return (
    <>
      <Navbar/>
      <div className="container d-flex flex-column align-items-center">
        {fetchLoading ? <Spinner/> : pizzaState.map(pizza => (
          <ItemCard key={pizza.id} pizza={pizza}/>
        ))}

      </div>
      <div className="container d-flex flex-row-reverse align-items-center">
        <div className="ms-5">
          <Link to="/checkout" className="btn  btn-outline-success">Checkout</Link>
        </div>
        <p className="m-0 text-uppercase fw-bold">Order total: {totalPrice === 0 ? '0' : totalPrice + DELIVERY_PRICE} </p>
      </div>
    </>


  );
};

export default Home;