import { combineReducers } from "redux";
import audioReducer from "./slices/audio.reducer";
import nextupReducer from "./slices/nextup.reducer";
import trackSlice from "./slices/track.slice.js";
import trackReducer from "./slices/track.slice.js";
import userSlice from "./slices/user.slice";

const rootReducer = combineReducers({
	nextup: nextupReducer,
	audio: audioReducer,
	tracks: trackSlice.reducer,
	user: userSlice.reducer,
});
export default rootReducer;
