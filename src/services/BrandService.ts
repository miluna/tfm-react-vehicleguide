// BRANDS CRUD
import axios from "axios";
import config from "../config";
import {getAuthHeader, getDefaultHeaders} from "./AuthService";
import Brand from "../models/Brand";

export const getBrand : Function = (id: number) : Promise<Brand> => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/brands/${id}`, {headers: headers})
};

export const getAllBrands : Function = () => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/brands`, {headers: headers})
};

export const addBrand : Function = (brand : Brand) : Promise<Brand> => {
    const headers = getAuthHeader();
    return axios.post(`${config.REST_BASE_URL}/brands`, brand, {headers: headers})
};

export const updateBrand : Function = (id: number, brand : Brand) : Promise<Brand> => {
    const headers = getAuthHeader();
    return axios.put(`${config.REST_BASE_URL}/brands/${id}`, brand, {headers: headers})
};

export const deleteBrand : Function = (id: number) => {
    const headers = getAuthHeader();
    return axios.delete(`${config.REST_BASE_URL}/brands/${id}`, {headers: headers})
};
