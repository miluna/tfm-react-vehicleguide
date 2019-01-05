// GENERAL FUNCTIONALITY
import axios from "axios";
import config from "../config.json";
import {getDefaultHeaders} from "./AuthService";
import Vehicle from "../models/Vehicle.js";
import Search from "../models/Search";

export async function doSearch(searchObject : Search) : Promise<Vehicle[]> {
    const headers = getDefaultHeaders();
    const searchString : string = getQueryString(searchObject);
    try {
        const results = await axios.get(searchString, {headers: headers});
        return results.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


function getQueryString (searchObject: Search) : string {
    let searchString : string = `${config.REST_BASE_URL}/search`;
    let moreThanOneParameter : boolean = false;
    const { name, brand, type, order, orderValue, minPrice, maxPrice } = searchObject;
    
    if (name !== null) {
        searchString += `?name=${name}`;
        moreThanOneParameter = true;
    }

    if (type !== null) {
        if (moreThanOneParameter) {
            searchString += `&type=${type}`
        } else {
            searchString += `?type=${type}`
            moreThanOneParameter = true;
        }
    }

    if (brand !== null && brand !== undefined) {
        if (moreThanOneParameter) {
            searchString += `&brand=${brand.id}`
        } else {
            searchString += `?brand=${brand.id}`
            moreThanOneParameter = true;
        }
    }

    if (minPrice !== null) {
        if (moreThanOneParameter) {
            searchString += `&minPrice=${minPrice}`
        } else {
            searchString += `?minPrice=${minPrice}`
            moreThanOneParameter = true;
        }
    }

    if (maxPrice !== null) {
        if (moreThanOneParameter) {
            searchString += `&maxPrice=${maxPrice}`
        } else {
            searchString += `?maxPrice=${maxPrice}`
            moreThanOneParameter = true;
        }
    }

    if (orderValue !== null) {
        if (moreThanOneParameter) {
            searchString += `&orderValue=${orderValue}`
        } else {
            searchString += `?orderValue=${orderValue}`
            moreThanOneParameter = true;
        }
    }

    if (order !== null) {
        if (moreThanOneParameter) {
            searchString += `&order=${order}`
        } else {
            searchString += `?order=${order}`
            moreThanOneParameter = true;
        }
    }

    return searchString;
}
