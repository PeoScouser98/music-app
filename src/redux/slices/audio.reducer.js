const audioReducer = (
	state = {
		currentTrack: null,
		isPlaying: false,
		isLooping: false,
		isShuffle: false,
	},
	action,
) => {
	switch (action.type) {
		case "PLAY":
			return { ...state, isPlaying: true };
		case "PAUSE":
			return { ...state, isPlaying: false };
		case "CHANGE_TRACK":
			return { currentTrack: action.payload, isPlaying: true };
		case "TOGGLE_LOOP":
			return { ...state, isLooping: !state.isLopping };
		case "TOGGLE_SHUFFLE":
			return { ...state, isLooping: !state.isShuffle };
		default:
			return state;
	}
};
export default audioReducer;
