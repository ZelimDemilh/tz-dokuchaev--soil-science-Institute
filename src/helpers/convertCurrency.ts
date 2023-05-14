import {IRates} from "../types/currency";

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string, rates: IRates): number => {
    if(amount === 0 ){
        return 0
    }

    console.log(amount)
    const base = amount / rates[fromCurrency];
    const target = amount / rates[toCurrency];
    return (amount * base) / target;
}