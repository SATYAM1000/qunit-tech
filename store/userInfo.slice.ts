import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserType = {
    _id: string,
    name: string,
    email: string,
    category: string,

}

interface UserState {
    user: UserType | null;
}
const initialState: UserState = {
    user: null
};


export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        login: (state, action:PayloadAction<UserType>) => {
            const user: UserType = {
                _id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                category: action.payload.category,
            }

            state.user = user
        },
        logout: (state, action) => {
            state.user = null
        }

    }
})
export const { login, logout } = userSlice.actions;

export default userSlice.reducer

