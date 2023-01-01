import React from 'react';
import {PizzaApi} from "../../../types";
import {Link} from "react-router-dom";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  pizza: PizzaApi;
  loading: false | string;
  deletePizza: React.MouseEventHandler;
}

const ItemCardAdmin: React.FC<Props> = ({pizza, loading, deletePizza}) => {

  return (
    <>
      <div className="card mb-3">
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
            <div className="d-flex justify-content-between w-75">
              <Link to={"/admin/edit-dish/" + pizza.id} className="btn btn-outline-info">Edit</Link>
              <button
                disabled={loading ? loading === pizza.id : false}
                className="btn btn-outline-danger"
                onClick={deletePizza}
              >
                {loading && loading === pizza.id && <ButtonSpinner/>}
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCardAdmin;