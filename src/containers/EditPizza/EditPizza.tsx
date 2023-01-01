import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOnePizza, selectPizzaUpdateLoading} from "../../features/pizza/pizzaSlice";
import {Pizza} from "../../../types";
import {fetchOnePizza, updatePizza} from "../../features/pizza/pizzaThunks";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import PizzaForm from "../../components/PizzaForm/PizzaForm";

const EditPizza = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateLoading = useAppSelector(selectPizzaUpdateLoading);
  const pizza = useAppSelector(selectOnePizza);



  const onSubmit = async (pizza: Pizza) => {
    await dispatch(updatePizza({id, pizza}));
    navigate('/admin/dishes');
  }

  useEffect( () => {
    dispatch(fetchOnePizza(id))
  }, [dispatch, id]);

  const editingPizza = pizza && {
    ...pizza,
    price: pizza.price.toString(),
  };
  return (
    <>
      <NavbarAdmin/>
      <div className="container">
        {editingPizza && <PizzaForm onSubmit={onSubmit} editingPizza={editingPizza} loading={updateLoading}/>}
      </div>
    </>
  );
};

export default EditPizza;