const nextupReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_NEXT_UP":
			return state;
		case "ADD_TO_NEXT_UP":
			return [...state, action.payload];
		case "REMOVE_FROM_NEXT_UP":
			return state.filter((track) => track._id !== action.payload._id);
		default:
			return state;
	}
};
export default nextupReducer;
