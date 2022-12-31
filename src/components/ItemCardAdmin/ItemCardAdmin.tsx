import React from 'react';
import {PizzaApi} from "../../../types";

interface Props {
  pizza: PizzaApi;
}

const ItemCardAdmin: React.FC<Props> = ({pizza}) => {
  return (
   <>
     <div className="card mb-3 w-50">
       <div className="row g-0">
         <div className="col-md-3">
           <img src={pizza.pic} className="img-fluid rounded-start" alt={pizza.name + '-pic'}/>
         </div>
         <div className="col-md-8">
           <div className="card-body">
             <h5 className="card-title">{pizza.name}</h5>
             <p className="card-text">{pizza.price} KGS</p>
           </div>
         </div>
       </div>
     </div>
   </>
  );
};

export default ItemCardAdmin;