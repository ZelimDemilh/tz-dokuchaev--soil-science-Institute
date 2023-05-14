import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {IUser} from "../../types/user";

export const login = createAsyncThunk<IUser, unknown>(
    "user/login",
    async function() {
        const res: IUser = {
            baseCurrency: Cookies.get("baseCurrency")  || "USD"
        }//fetch для авторизации

        Cookies.set("baseCurrency", res.baseCurrency)

        return res
    }
);

export const changeCurrency = createAsyncThunk<string, string>(
    "user/changeCurrency",
    async function (currency) {
        const res: string = currency // fetch для изменения базовой валюты
        await Cookies.set("baseCurrency", currency)
        return res
    }
)