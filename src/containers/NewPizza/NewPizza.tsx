import React from 'react';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import PizzaForm from "../../components/PizzaForm/PizzaForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPizzaCreateLoading} from "../../features/pizza/pizzaSlice";
import {Pizza} from "../../../types";
import {createPizza} from "../../features/pizza/pizzaThunks";

const NewPizza = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectPizzaCreateLoading);

  const onSubmit = async (pizza: Pizza) => {
    await dispatch(createPizza(pizza));
    navigate('/admin/dishes');
  }

  return (
    <>
      <NavbarAdmin/>
      <div className="container">
        <PizzaForm onSubmit={onSubmit} loading={createLoading}/>
      </div>
    </>
  );
};

export default NewPizza;