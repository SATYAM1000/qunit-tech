import { createSlice } from "@reduxjs/toolkit";

type UserType = {
    _id: string,
    name: string,
    email: string,
    role: string,

}
const initialState: { user: UserType | null } = {
    user: null
};


export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        login: (state, action) => {
            const user: UserType = {
                _id: action.payload,
                name: action.payload,
                email: action.payload,
                role: action.payload,
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

