import { combineReducers, createStore } from "redux";
import ListProductReducer from "./reducers/ListProductReducer";

const rootReducer = combineReducers({
  ListProductReducer,
});

const store = createStore(rootReducer);
export default store;
