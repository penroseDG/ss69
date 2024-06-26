interface Product{
  id: number,
  name: string;
  price: string,
  quantity: number,
  img: string
}
const loadFromLocal = (): Product[] => {
  try {
    const dataLocal = localStorage.getItem("Carts");
    return dataLocal ? JSON.parse(dataLocal) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const saveToLocal = (state: Product[]) => {
  try {
    localStorage.setItem("Carts", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

const initialState: Product[] = loadFromLocal();

const ListProductReducer = (state = initialState, action: any): Product[] => {
  let newState: Product[];
  switch (action.type) {
    case "DELETE":
      newState = state.filter(product => product.id !== action.payload);
      saveToLocal(newState);
      return newState;
    case "UPDATE":
      newState = state.map(product => 
        product.id === action.payload.id ? action.payload : product
      );
      saveToLocal(newState);
      return newState;
    case "ADD_TO_CART":
      const productExists = state.find(product => product.id === action.payload.id);
      if (productExists) {
        newState = state.map(product => 
          product.id === action.payload.id 
          ? { ...product, quantity: product.quantity + action.payload.quantity }
          : product
        );
      } else {
        newState = [...state, action.payload];
      }
      saveToLocal(newState);
      return newState;
    default:
      return state;
  }
};

export default ListProductReducer;
