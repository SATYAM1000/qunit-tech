import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userInfo.slice"
export const store = configureStore({
    reducer: {
        UserReducer
    }
})
export type IRootState=ReturnType<typeof store.getState>