import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import nextupReducer from "./reducers/nextup.reducer";
import rootReducer from "./rootReducer";
// console.log(rootReducer);

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, compose(ReactReduxDevTools));
console.log(store.getState());
export default store;
