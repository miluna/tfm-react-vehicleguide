// VEHICLES CRUD
import axios from "axios";
import config from "../config";
import {getAuthHeader, getDefaultHeaders} from "./AuthService";
import Vehicle from "../models/Vehicle";

export const getVehicle : Function = (id : number) => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/vehicles/${id}`, {headers: headers})
};

export const getAllVehicles : Function = () => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/vehicles`, {headers: headers})
};

export const addVehicle : Function = (vehicle : Vehicle) => {
    const headers = getAuthHeader();
    return axios.post(`${config.REST_BASE_URL}/vehicles`, vehicle, {headers: headers})
};

export const updateVehicle : Function = (id : number, vehicle : Vehicle) => {
    const headers = getAuthHeader();
    return axios.put(`${config.REST_BASE_URL}/vehicles/${id}`, vehicle, {headers: headers})
};

export const deleteVehicle : Function = (id : number) => {
    const headers = getAuthHeader();
    return axios.delete(`${config.REST_BASE_URL}/vehicles/${id}`, {headers: headers})
};

// COMBINED
export const getVehicleEngines : Function = (vehicleId : number) => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/vehicles/${vehicleId}/engines`, {headers: headers})
};

export const getBrandVehicles : Function = (brandId : number) => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/vehicles?brandId=${brandId}`, {headers: headers})
};
