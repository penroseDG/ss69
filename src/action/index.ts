export interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

export const deleteCart = (cartId: number) => {
  return {
    type: "DELETE",
    payload: cartId,
  };
};

export const updateCart = (cart: Product) => {
  return {
    type: "UPDATE",
    payload: cart,
  };
};

export const addToCart = (product: Product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
