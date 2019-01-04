// ENGINES CRUD
import axios from "axios";
import config from "../config.json";
import {getAuthHeader, getDefaultHeaders} from "./AuthService";
import Engine from "../models/Engine";
import CrudService from "./CrudService.js";

export default class EngineService implements CrudService<Engine> {
    
    async getAll(): Promise<Engine[]> {
        const headers = getDefaultHeaders();
        let results = [];
        try {
            const response = await axios.get(`${config.REST_BASE_URL}/engines`, {headers: headers});
            results = response.data;
        } catch (e) {
            console.log(e);
        }
        return results;
    }    
    
    async getOne(id: number): Promise<Engine> {
        const headers = getDefaultHeaders();
        let result : Engine = {};
        try {
            const response = await axios.get(`${config.REST_BASE_URL}/engines/${id}`, {headers: headers});
            result = response.data;
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    async createOne(engine: Engine): Promise<Engine> {
        const headers = getAuthHeader();
        let result : Engine = {};
        try {
            const response = await axios.post(`${config.REST_BASE_URL}/engines`, engine, {headers: headers});
            result = response.data;
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    async updateOne(id: number, engine: Engine): Promise<Engine> {
        const headers = getAuthHeader();
        let result : Engine = {};
        try {
            const response = await axios.put(`${config.REST_BASE_URL}/engines/${id}`, engine, {headers: headers});
            result = response.data;
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    async deleteOne(id: number): Promise<Boolean> {
        const headers = getAuthHeader();
        let result = false;
        try {
            await axios.delete(`${config.REST_BASE_URL}/engines/${id}`, {headers: headers})
            result = true;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
}
