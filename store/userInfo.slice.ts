/** @format */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type UserType = {
	_id: string;
	name: string;
	email: string;
	category: string;
};

interface UserState {
	user: UserType | null;
	isloggedIn: boolean;
}
const initialState: UserState = {
	user: null,
	isloggedIn: false,
};

export const userSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserType>) => {
			
			state.user = {
				_id: action.payload._id,
				name: action.payload.name,
				email: action.payload.email,
				category: action.payload.category,
			};
			state.isloggedIn = true;
			console.log((state.user));
			
		},
		logout: (state, action) => {
			state.user = null;
			state.isloggedIn = false;
		},
	},
});
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
