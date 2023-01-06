import React, {useState} from 'react';
import {Client, OrderClient} from "../../../types";
import {useAppSelector} from "../../app/hooks";
import {selectCartPizza} from "../../features/pizza/pizzaSlice";
import {Link} from "react-router-dom";

interface Props {
  onSubmit: (order: OrderClient) => void;
}

const OrderForm: React.FC<Props> = ({onSubmit}) => {
  const cartState = useAppSelector(selectCartPizza);

  const [client, setClient] = useState<Client>( {
    name: '',
    phone: '',
    address: '',
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setClient(prev => ({...prev, [name]: value}));
  };
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = Object.fromEntries(cartState.map(n => [n.pizza.id, n.amount]));
    onSubmit({
      client,
      order,
    });
    console.log(client);
  };

  let btnActive = false;
  if (cartState.length === 0) {
    btnActive = true;
  }
  return (
    <>
      <form onSubmit={onFormSubmit} className="mb-5">
        <h4>Enter your contact info for delivery:</h4>
        <div className="form-group  mb-3">
          <label htmlFor="name">Name</label>
          <input
            id="name" name="name" type="text"
            className="form-control"
            value={client.name}
            onChange={onFormChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Phone</label>
          <input
            id="phone" name="phone" type="number"
            className="form-control"
            value={client.phone}
            onChange={onFormChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Address</label>
          <input
            id="address" name="address" type="text"
            className="form-control"
            value={client.address}
            onChange={onFormChange}
            required
          />
        </div>
        <div className="d-flex justify-content-between w-100 px-2">
          <div>
            <Link to="/" className="btn btn-lg btn-outline-danger px-5">Cancel</Link>
          </div>
          <div>
            <button disabled={btnActive} className="btn btn-lg btn-outline-success px-5" type="submit">Order</button>
          </div>
        </div>
      </form>

    </>
  );
};

export default OrderForm;