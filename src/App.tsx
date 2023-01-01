import React from 'react';
import {Route, Routes} from "react-router-dom";
import Admin from "./containers/Admin/Admin";
import NewPizza from "./containers/NewPizza/NewPizza";
import AdminDishes from "./containers/AdminDishes/AdminDishes";
import EditPizza from "./containers/EditPizza/EditPizza";

function App() {
  return (
    <>
        <Routes>
          <Route path="/admin/" element={<Admin/>}/>
          <Route path="/admin/add-new-dish" element={<NewPizza/>}/>
          <Route path="/admin/dishes" element={<AdminDishes/>}/>
          <Route path="/admin/edit-dish/:id" element={<EditPizza/>}/>
        </Routes>
    </>
  );
}

export default App;
