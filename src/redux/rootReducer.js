import { combineReducers } from "redux";
import nextupReducer from "./reducers/nextup.reducer";

const rootReducer = combineReducers({
	track: nextupReducer,
});
export default rootReducer;
