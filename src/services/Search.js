// GENERAL FUNCTIONALITY
import axios from "axios";
import config from "../config";
import {getDefaultHeaders} from "./Auth";

export const searchBrandsOrVehicles = (typedMessage, type) => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/search?name=${typedMessage}?type=${type}`, {headers: headers});
};

export const doSearch = async (searchName, searchType, searchBrand, searchMinPrice, searchMaxPrice, searchValueOrder, searchOrder) => {
    const headers = getDefaultHeaders();
    const searchString = getQueryString(searchName, searchType, searchBrand, searchMinPrice, searchMaxPrice, searchValueOrder, searchOrder);
    try {
        const results = await axios.get(searchString, {headers: headers});
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
};


const getQueryString = (searchName, searchType, searchBrand, searchMinPrice, searchMaxPrice, searchValueOrder, searchOrder) => {
    let searchString = `${config.REST_BASE_URL}/search`;
    let moreThanOneParameter = false;
    
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