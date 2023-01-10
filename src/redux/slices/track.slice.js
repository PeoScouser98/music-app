import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TrackApi from "@/api/track";
export const fetchAllTrack = createAsyncThunk("tracks/fetchAll", async (limit) => {
	console.log(limit);
	const res = await TrackApi.getAll(limit);
	console.log(res);
	return res;
});

import { createSlice } from "@reduxjs/toolkit";

const trackSlice = createSlice({
	name: "tracks",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllTrack.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export default trackSlice;
