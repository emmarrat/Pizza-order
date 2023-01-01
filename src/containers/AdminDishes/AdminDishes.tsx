import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPizza, selectPizzaFetchLoading} from "../../features/pizza/pizzaSlice";
import {fetchPizza} from "../../features/pizza/pizzaThunks";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ItemCardAdmin from "../../components/ItemCardAdmin/ItemCardAdmin";

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const pizzaState = useAppSelector(selectPizza);
  const fetchLoading = useAppSelector(selectPizzaFetchLoading);

  useEffect( () => {
    dispatch(fetchPizza());
  }, [dispatch]);
  return (
    <>
      <NavbarAdmin/>
      <div className="container d-flex justify-content-between align-items-center">
        <h3>Dishes</h3>
        <div>
          <Link to="/admin/add-new-dish" className="btn btn-outline-success">Add new dish</Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        {fetchLoading ? <Spinner/> : pizzaState.map(pizza => (
          <ItemCardAdmin key={pizza.id} pizza={pizza}/>
        ))}
      </div>
    </>
  );
};

export default AdminDishes;