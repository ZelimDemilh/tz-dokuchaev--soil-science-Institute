import axios from "axios";
import Cookies from "js-cookie";

export const appId = "fbd7a7378acd4817be760bf23b89179a"

const baseService = axios.create({
    baseURL: `https://openexchangerates.org/api/latest.json`,
    params: {
        app_id: appId,
    }
});

export default baseService