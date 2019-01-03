// BRANDS CRUD
import axios from "axios";
import config from "../config.json";
import {getAuthHeader, getDefaultHeaders} from "./AuthService";
import Brand from "../models/Brand";
import CrudService from "./CrudService.js";

export default class BrandService implements CrudService<Brand> {
    
    async getAll() : Promise<Array<Brand>> {
        const headers = getDefaultHeaders();
        let results = [];
        try {
            const AxiosResponse = 
                await axios.get(`${config.REST_BASE_URL}/brands`, {headers: headers});
            results = AxiosResponse.data;
        } catch (e) {
            console.log(e);
        }
        return results;
    }

    async getOne(id: number) : Promise<Brand> {
        const headers = getDefaultHeaders();
        let result : Brand = new Brand();
        try {
            result = await axios.get(`${config.REST_BASE_URL}/brands/${id}`, {headers: headers});
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    async createOne(brand : Brand) : Promise<Brand> {
        const headers = getAuthHeader();
        let result : Brand = new Brand();
        try {
            result = await axios.post(`${config.REST_BASE_URL}/brands`, brand, {headers: headers});
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
    async updateOne(id: number, brand : Brand) : Promise<Brand> {
        const headers = getAuthHeader();
        let result : Brand = new Brand();
        try {
            result = await axios.put(`${config.REST_BASE_URL}/brands/${id}`, brand, {headers: headers});
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
    async deleteOne(id: number) : Promise<Boolean> {
        const headers = getAuthHeader();
        let result = false;
        try {
            await axios.delete(`${config.REST_BASE_URL}/brands/${id}`, {headers: headers});
            result = true;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
}
