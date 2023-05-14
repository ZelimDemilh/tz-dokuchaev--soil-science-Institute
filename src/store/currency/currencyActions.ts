import {createAsyncThunk} from "@reduxjs/toolkit";
import baseService, {appId} from "../../helpers/baseService";
import {IRates} from "../../types/currency";
import Cookies from "js-cookie";

export const uploadRates = createAsyncThunk<IRates, unknown>(
    "rates/upload",
    async function (_, thunkAPI){
        try {
            const {data} = await baseService.get("")
            return data.rates
        }
        catch (e){
            return thunkAPI.rejectWithValue("error: " + e);
        }
    }
)