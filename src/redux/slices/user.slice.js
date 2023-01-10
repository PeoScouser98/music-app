import { getUser } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
export const fetchUserThunkAction = createAsyncThunk("user/fetchUser", async () => {
	return await getUser();
});
const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserThunkAction.fulfilled, (state, action) => {
			console.log(action.payload);
			return action.payload;
		});
	},
});
export default userSlice;
