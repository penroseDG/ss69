import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../action';
import AlertSuccess from '../alert/AlertSuccess';
import "../listProduct/listProducts.css";
interface Product{
  id: number,
  name: string;
  price: string,
  quantity: number,
  img: string
}
const products: Product[] = [
  { id: 1, name: "samsung", price: "30 USD", quantity: 1, img: "imgs/phone.jpg" },
  { id: 2, name: "machine", price: "15 USD", quantity: 1, img: "imgs/machine.jpg" },
  { id: 3, name: "Bread", price: "20 USD", quantity: 1, img: "imgs/food.jpg" },
  { id: 4, name: "Tea", price: "10 USD", quantity: 1, img: "imgs/water.jpg" }
];

export default function ListProducts() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  
  const handleAddToCart = (product: Product) => {
    const quantity = (document.querySelector(`input[name="quantity-product-${product.id}"]`) as HTMLInputElement).value;
    dispatch(addToCart({ ...product, quantity: parseInt(quantity) }));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      {showAlert && <AlertSuccess />}
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              {products.map(product => (
                <div className="media product" key={product.id}>
                  <div className="media-left">
                    <a href="#">
                      <img className="media-object" src={product.img} alt={product.name} />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{product.name}</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                      dicta asperiores veniam repellat unde debitis quisquam
                      magnam magni ut deleniti!
                    </p>
                    <input
                      name={`quantity-product-${product.id}`}
                      type="number"
                      min={1}
                      defaultValue={1}
                    />
                    <a
                      data-product={product.id}
                      className="price"
                      onClick={() => handleAddToCart(product)}
                    >
                      {product.price}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
