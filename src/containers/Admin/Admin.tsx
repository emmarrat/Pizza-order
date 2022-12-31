import React, {useEffect} from 'react';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPizza, selectPizzaFetchLoading} from "../../features/pizza/pizzaSlice";
import {fetchPizza} from "../../features/pizza/pizzaThunks";
import ItemCardAdmin from "../../components/ItemCardAdmin/ItemCardAdmin";
import Spinner from "../../components/Spinner/Spinner";

const Admin = () => {
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
        <div>Dishes</div>
        <div>
          <Link to="/admin/add-new-dish" className="btn btn-outline-success">Add new dish</Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        {fetchLoading ? <Spinner/> : pizzaState.map(pizza => (
          <ItemCardAdmin pizza={pizza}/>
        ))}
      </div>
    </>
  );
};

export default Admin;