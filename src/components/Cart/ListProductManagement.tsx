import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, updateCart } from '../../action';
import "../listProduct/listProducts.css";
import "./bootstrapt.min.css";
import AlertDanger from '../alert/AlertDanger';
import AlertSuccess from '../alert/AlertSuccess';
interface Product{
  id: number,
  name: string;
  price: string,
  quantity: number,
  img: string
}
export default function ListProductManagement() {
  const dispatch = useDispatch();
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const cart = useSelector((state: any) => state.ListProductReducer);

  const handleDelete = (id: number) => {
    dispatch(deleteCart(id));
    setShowAlertDelete(true);
    setTimeout(() => {
      setShowAlertDelete(false);
    }, 3000);
  };

  const handleUpdate = (product: Product) => {
    const quantity = (document.querySelector(`input[name="cart-item-quantity-${product.id}"]`) as HTMLInputElement).value;
    dispatch(updateCart({ ...product, quantity: parseInt(quantity) }));
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h1 className="panel-title">Your Cart</h1>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "4%" }}>STT</th>
                <th>Name</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "4%" }}>Quantity</th>
                <th style={{ width: "25%" }}>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              {cart.map((product: Product, index: number) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <input
                      name={`cart-item-quantity-${product.id}`}
                      type="number"
                      min={1}
                      defaultValue={product.quantity}
                    />
                  </td>
                  <td>
                    <a className="label label-info update-cart-item" onClick={() => handleUpdate(product)}>
                      Update
                    </a>
                    <a className="label label-danger delete-cart-item" onClick={() => handleDelete(product.id)}>
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot id="my-cart-footer">
              <tr>
                <td colSpan={4}>
                  There are <b>{cart.length}</b> items in your shopping cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                  {cart.reduce((total: number, product: Product) => total + parseFloat(product.price) * product.quantity, 0)} USD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {showAlertDelete && <AlertDanger />}
    </div>
  );
}
