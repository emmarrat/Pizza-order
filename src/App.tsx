import React from 'react';
import {Route, Routes} from "react-router-dom";
import Admin from "./containers/Admin/Admin";
import NewPizza from "./containers/NewPizza/NewPizza";

function App() {
  return (
    <>
        <Routes>
          <Route path="/admin/" element={<Admin/>}/>
          <Route path="/admin/add-new-dish" element={<NewPizza/>}/>
        </Routes>
    </>
  );
}

export default App;
