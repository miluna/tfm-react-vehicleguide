// GENERAL FUNCTIONALITY
import axios from "axios";
import config from "../config.json";
import {getDefaultHeaders} from "./AuthService";
import Vehicle from "../models/Vehicle.js";

export async function doSearch( searchName : string, 
                                searchType : string, 
                                searchBrand: string, 
                                searchMinPrice: number, 
                                searchMaxPrice: number, 
                                searchValueOrder: string, 
                                searchOrder : string) : Promise<Vehicle[]> {
    const headers = getDefaultHeaders();
    const searchString : string = getQueryString(searchName, searchType, searchBrand, searchMinPrice, searchMaxPrice, searchValueOrder, searchOrder);
    try {
        const results = await axios.get(searchString, {headers: headers});
        return results.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


function getQueryString ( searchName : string, 
                                    searchType : string, 
                                    searchBrand: string, 
                                    searchMinPrice: number, 
                                    searchMaxPrice: number, 
                                    searchValueOrder: string, 
                                    searchOrder : string) : string {
    let searchString : string = `${config.REST_BASE_URL}/search`;
    let moreThanOneParameter : boolean = false;
    
    if (searchName !== null) {
        searchString += `?name=${searchName}`;
        moreThanOneParameter = true;
    }

    if (searchType !== null) {
        if (moreThanOneParameter) {
            searchString += `&type=${searchType}`
        } else {
            searchString += `?type=${searchType}`
            moreThanOneParameter = true;
        }
    }

    if (searchBrand !== null) {
        if (moreThanOneParameter) {
            searchString += `&brand=${searchBrand}`
        } else {
            searchString += `?brand=${searchBrand}`
            moreThanOneParameter = true;
        }
    }

    if (searchMinPrice !== null) {
        if (moreThanOneParameter) {
            searchString += `&minPrice=${searchMinPrice}`
        } else {
            searchString += `?minPrice=${searchMinPrice}`
            moreThanOneParameter = true;
        }
    }

    if (searchMaxPrice !== null) {
        if (moreThanOneParameter) {
            searchString += `&maxPrice=${searchMaxPrice}`
        } else {
            searchString += `?maxPrice=${searchMaxPrice}`
            moreThanOneParameter = true;
        }
    }

    if (searchValueOrder !== null) {
        if (moreThanOneParameter) {
            searchString += `&orderValue=${searchValueOrder}`
        } else {
            searchString += `?orderValue=${searchValueOrder}`
            moreThanOneParameter = true;
        }
    }

    if (searchOrder !== null) {
        if (moreThanOneParameter) {
            searchString += `&order=${searchOrder}`
        } else {
            searchString += `?order=${searchOrder}`
            moreThanOneParameter = true;
        }
    }

    return searchString;
}
