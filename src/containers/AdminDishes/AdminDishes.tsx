import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPizza, selectPizzaFetchLoading, selectPizzaRemoveLoading} from "../../features/pizza/pizzaSlice";
import {fetchPizza, removePizza} from "../../features/pizza/pizzaThunks";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ItemCardAdmin from "../../components/ItemCardAdmin/ItemCardAdmin";

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const pizzaState = useAppSelector(selectPizza);
  const fetchLoading = useAppSelector(selectPizzaFetchLoading);
  const removeLoading = useAppSelector(selectPizzaRemoveLoading)

  const deletePizza = async (id: string) => {
    if (window.confirm('Do you really want to delete selected pizza?')) {
      await dispatch(removePizza(id));
      await dispatch(fetchPizza());
    }
  };

  useEffect( () => {
    dispatch(fetchPizza());
  }, [dispatch]);
  return (
    <>
      <NavbarAdmin/>
      <div className="container d-flex justify-content-between align-items-center">
        <h3>Pizza menu:</h3>
        <div>
          <Link to="/admin/add-new-dish" className="btn btn-outline-success">Add new dish</Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        {fetchLoading ? <Spinner/> : pizzaState.map(pizza => (
          <ItemCardAdmin key={pizza.id} pizza={pizza} loading={removeLoading} deletePizza={() => deletePizza(pizza.id)}/>
        ))}
      </div>
    </>
  );
};

export default AdminDishes;