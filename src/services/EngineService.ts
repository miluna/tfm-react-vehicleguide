// ENGINES CRUD
import axios from "axios";
import config from "../config";
import {getAuthHeader, getDefaultHeaders} from "./AuthService";
import Engine from "../models/Engine";

export const getEngine : Function = (id : number) : Promise<Engine> => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/engines?id=${id}`, {headers: headers})
};

export const getAllEngines : Function = () => {
    const headers = getDefaultHeaders();
    return axios.get(`${config.REST_BASE_URL}/engines`, {headers: headers})
};

export const addEngine : Function = (engine : Engine) : Promise<Engine> => {
    const headers = getAuthHeader();
    return axios.post(`${config.REST_BASE_URL}/engines`, engine, {headers: headers})
};

export const updateEngine : Function = (engine : Engine) : Promise<Engine> => {
    const headers = getAuthHeader();
    return axios.put(`${config.REST_BASE_URL}/engines`, engine, {headers: headers})
};

export const deleteEngine : Function = (id : number) => {
    const headers = getAuthHeader();
    return axios.delete(`${config.REST_BASE_URL}/engines?id=${id}`, {headers: headers})
};
