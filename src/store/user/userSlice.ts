import { createSlice } from "@reduxjs/toolkit";
import {IUser} from "../../types/user";
import {changeCurrency, login} from "./userActions";
import Cookies from "js-cookie";

interface UserState {
    user: IUser;
    isLoading: boolean;
}

const initialState: UserState = {
    user: {
        baseCurrency: Cookies.get("baseCurrency") || "USD"
    },
    isLoading: false,
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false;
        });
        builder.addCase(changeCurrency.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(changeCurrency.fulfilled, (state, action) => {
            state.user.baseCurrency = action.payload
            state.isLoading = false;
        });
    },
});

export default UserSlice.reducer;