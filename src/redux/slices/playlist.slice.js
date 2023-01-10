const playlistReducer = (state = [], action) => {
	switch (key) {
		case "GET_PLAYLIST":
			return state;
		case "ADD_TO_PLAYLIST":
			return [...state, action.payload];
		case "REMOVE_FROM_PLAYLIST":
			return state.filter((prev) => prev._id !== action.payload._id);
		default:
			return state;
	}
};
