import React from 'react';
import {PizzaApi} from "../../../types";
import {Link} from "react-router-dom";

interface Props {
  pizza: PizzaApi;
}

const ItemCardAdmin: React.FC<Props> = ({pizza}) => {
  return (
   <>
     <div className="card mb-3">
       <div className="row g-0" style={{width: '500px'}}>
         <div className="col-md-3">
           <img src={pizza.pic} className="img-fluid rounded-start" alt={pizza.name + '-pic'}/>
         </div>
         <div className="col-md-8 card-body d-flex justify-content-between align-items-center">
           <div className="w-100 d-flex justify-content-between me-3">
             <div>
               <h5 className="card-title m-0">{pizza.name}</h5>
             </div>
             <div>
               <p className="card-text">{pizza.price} KGS</p>
             </div>
           </div>
           <div>
             <Link to={"/admin/edit-dish/" + pizza.id} className="btn btn-outline-info">Edit</Link>
           </div>
         </div>

       </div>
     </div>
   </>
  );
};

export default ItemCardAdmin;