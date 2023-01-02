import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  selectPizza,
  selectPizzaFetchLoading, selectTotalPrice,
  totalPrice
} from "../../features/pizza/pizzaSlice";
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
  const total = useAppSelector(selectTotalPrice);

  useEffect(() => {
    dispatch(fetchPizza());
  }, [dispatch]);

  const countTotal = () => {
    dispatch(totalPrice());
  };


  return (
    <>
      <Navbar/>
      <div className="container d-flex flex-column align-items-center">
        {fetchLoading ? <Spinner/> : pizzaState.map(pizza => (
          <ItemCard key={pizza.id} countTotal={countTotal} pizza={pizza}/>
        ))}
      </div>
      <div className={fetchLoading ? "d-none" : "container d-flex flex-row-reverse align-items-center"}>
        <div className="ms-5">
          <Link to="/checkout" className="btn  btn-outline-success">Checkout</Link>
        </div>
        <div>
          <p className="m-0 text-uppercase fw-bold">Order total: {total === 150 ? '0' : total}  KGS</p>
          <p className="fs-6 fw-lighter m-0">Delivery price is fixed: {DELIVERY_PRICE} KGS</p>
        </div>
      </div>
    </>


  );
};

export default Home;