import React from 'react';
import {DELIVERY_PRICE} from "../../constants";
import {MergedOrder} from "../../../types";
import {fetchOrders, removeOrder} from "../../features/pizza/pizzaThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {selectPizzaRemoveLoading} from "../../features/pizza/pizzaSlice";

interface Props {
  order:  MergedOrder;
}

const AdminOrderCard: React.FC<Props> = ({order}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPizzaRemoveLoading)


  const deleteOrder = async (id: string) => {
    if (window.confirm('Please, confirm that this order is completed')) {
      await dispatch(removeOrder(id));
    }
    await dispatch(fetchOrders());
  };

  return (
    <>
      <div className="card mb-2 p-3 w-50">
        {order.order.map(o => (
            <div key={Math.random()} className="d-flex align-items-center justify-content-between">
              <p className="mb-0"> {o.name} x {o.amount}</p>
              <p className="mb-0"> {o.total} KGS</p>
            </div>
        ))}
        <hr/>
        <div>
          <p className="mb-0 fw-bold">Client info:</p>
          <p className="mb-0">Name: <b>{order.client.name}</b></p>
          <p className="mb-0">Address: <b> {order.client.address}</b></p>
          <p className="mb-0">Phone: <b>{order.client.phone}</b></p>
        </div>
        <hr/>
        <p className="mb-0">Delivery price: <strong>{DELIVERY_PRICE} KGS</strong> </p>
        <p className="fw-bolder mb-0">Grand total for the order: {order.total} KGS</p>
        <button
          disabled={loading ? loading === order.id : false}
          onClick={() =>deleteOrder(order.id)}
          className="btn btn-outline-success mt-2"
        >
          {loading && loading === order.id && <ButtonSpinner/>}
          Complete order
        </button>
      </div>
    </>
  );
};

export default AdminOrderCard;