import React, {useState} from 'react';
import {Pizza, PizzaMutation} from "../../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (pizza: Pizza) => void;
  loading: boolean;
  editingPizza?: PizzaMutation;
}

const PizzaForm: React.FC<Props> = ({onSubmit, loading, editingPizza}) => {
  const [pizza, setPizza] = useState<PizzaMutation>(editingPizza ? editingPizza : {
    name: '',
    pic: '',
    price: '',
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setPizza(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...pizza,
      price: parseFloat(pizza.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{editingPizza ? 'Edit selected pizza' : 'Add new dish'}</h4>
      <div className="form-group  mb-3">
        <label htmlFor="name">Name</label>
        <input
          id="name" name="name" type="text"
          className="form-control"
          value={pizza.name}
          onChange={onFormChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="image">Image</label>
        <input
          id="image" name="pic" type="url"
          className="form-control"
          value={pizza.pic}
          onChange={onFormChange}
          required
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="price">Price</label>
        <input
          id="price" name="price" type="number"
          className="form-control"
          value={pizza.price}
          onChange={onFormChange}
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-success bg-gradient">
        {loading && <ButtonSpinner/>}
        {editingPizza ? 'Update' : ' Add new pizza'}
      </button>
    </form>
  );
};

export default PizzaForm;