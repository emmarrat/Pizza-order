import React from 'react';
import {PizzaApi} from "../../../types";
import {addPizza} from "../../features/pizza/pizzaSlice";
import {useAppDispatch} from "../../app/hooks";
import './ItemCard.css';

interface Props {
  pizza: PizzaApi
  countTotal: () => void;
}

const ItemCard: React.FC<Props> = ({pizza, countTotal}) => {
  const dispatch = useAppDispatch();
  const addToCart = () => {
    dispatch(addPizza(pizza));
    countTotal();
  };

  return (
    <>
      <div className="card mb-3 item-card" onClick={addToCart}>
        <div className="row g-0" style={{width: '700px'}}>
          <div className="col-md-3">
            <img src={pizza.pic} className="img-fluid rounded-start" alt={pizza.name + '-pic'}/>
          </div>
          <div className="col-md-8 card-body d-flex justify-content-between align-items-center">
            <div className="w-100 d-flex justify-content-between me-5">
              <div>
                <h5 className="card-title m-0">{pizza.name}</h5>
              </div>
              <div>
                <p className="card-text">{pizza.price} KGS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;