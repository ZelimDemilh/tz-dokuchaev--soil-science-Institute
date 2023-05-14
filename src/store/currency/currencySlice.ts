import { createSlice } from "@reduxjs/toolkit";
import {IRates} from "../../types/currency";
import {uploadRates} from "./currencyActions";
import {changeCurrency} from "../user/userActions";

interface CurrencyState {
    rates: IRates;
    isLoading: boolean;
}

const initialState: CurrencyState = {
    rates: {},
    isLoading: false,
};

export const CurrencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadRates.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadRates.fulfilled, (state, action) => {
            state.rates = action.payload
            state.isLoading = false;
        });

    },
});

export default CurrencySlice.reducer;