// GENERAL FUNCTIONALITY
import axios from "axios";
import config from "../config.json";
import { getDefaultHeaders } from "./AuthService";
import Vehicle from "../models/Vehicle.js";
import Search from "../models/Search";

export default class SearchService {

    async doSearch(searchObject: Search): Promise<Vehicle[]> {
        const headers = getDefaultHeaders();
        const searchString: string = this.getQueryString(searchObject);
        try {
            if(searchString.endsWith("search")) throw new Error("No parameters selected")
            const results = await axios.get(searchString, { headers: headers });
            return results.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    getQueryString(searchObject: Search): string {
        let searchString: string = `${config.REST_BASE_URL}/search`;
        let moreThanOneParameter: boolean = false;
        const { name, brand, type, order, orderValue, minPrice, maxPrice } = searchObject;

        if (name) {
            searchString += `?name=${name}`;
            moreThanOneParameter = true;
        }

        if (type) {
            if (moreThanOneParameter) {
                searchString += `&type=${type.id}`
            } else {
                searchString += `?type=${type.id}`
                moreThanOneParameter = true;
            }
        }

        if (brand) {
            if (moreThanOneParameter) {
                searchString += `&brand=${brand.name}`
            } else {
                searchString += `?brand=${brand.name}`
                moreThanOneParameter = true;
            }
        }

        if (minPrice) {
            if (moreThanOneParameter) {
                searchString += `&minPrice=${minPrice}`
            } else {
                searchString += `?minPrice=${minPrice}`
                moreThanOneParameter = true;
            }
        }

        if (maxPrice) {
            if (moreThanOneParameter) {
                searchString += `&maxPrice=${maxPrice}`
            } else {
                searchString += `?maxPrice=${maxPrice}`
                moreThanOneParameter = true;
            }
        }

        if (orderValue) {
            if (moreThanOneParameter) {
                searchString += `&orderValue=${orderValue.id}`
            } else {
                searchString += `?orderValue=${orderValue.id}`
                moreThanOneParameter = true;
            }
        }

        if (order) {
            if (moreThanOneParameter) {
                searchString += `&order=${order.id}`
            } else {
                searchString += `?order=${order.id}`
                moreThanOneParameter = true;
            }
        }

        return searchString;
    }

}
