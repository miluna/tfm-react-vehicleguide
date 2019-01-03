import axios from "axios";
import config from "../config.json";
import {getDefaultHeaders} from "./AuthService";
import Vehicle from "../models/Vehicle.js";

export async function getLatestNews() : Promise<Vehicle> {
    const headers = getDefaultHeaders();
    try {
        const results = await axios.get(`${config.REST_BASE_URL}/latest`, {headers: headers});
        return results.data;
    } catch (e) {
        console.log(e);
        return [];
    }
};
