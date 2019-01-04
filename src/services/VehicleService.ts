// VEHICLES CRUD
import axios from "axios";
import config from "../config.json";
import {getAuthHeader, getDefaultHeaders} from "./AuthService";
import Vehicle from "../models/Vehicle";
import CrudService from "./CrudService.js";
import Engine from "../models/Engine.js";
import Brand from "../models/Brand.js";

export default class VehicleService implements CrudService<Vehicle> {
    
    async getAll(): Promise<Vehicle[]> {
        const headers = getDefaultHeaders();
        let results = [];
        try {
            const response = await axios.get(`${config.REST_BASE_URL}/vehicles`, {headers: headers})
            results = response.data;
        } catch (e) {
            console.log(e);
        }
        return results;
    }    
    
    async getOne(id: number): Promise<Vehicle> {
        const headers = getDefaultHeaders();
        let result : Vehicle = new Vehicle();
        try {
            const response = await axios.get(`${config.REST_BASE_URL}/vehicles/${id}`, {headers: headers});
            result = response.data;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
    async createOne(vehicle: Vehicle): Promise<Vehicle> {
        const headers = getAuthHeader();
        let result : Vehicle = new Vehicle();
        try {
            const response = await axios.post(`${config.REST_BASE_URL}/vehicles`, vehicle, {headers: headers});
            result = response.data;
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
    async updateOne(id: number, vehicle: Vehicle): Promise<Vehicle> {
        const headers = getAuthHeader();
        let result : Vehicle = new Vehicle();
        try {
            const response = await axios.put(`${config.REST_BASE_URL}/vehicles/${id}`, vehicle, {headers: headers});
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
            await axios.delete(`${config.REST_BASE_URL}/vehicles/${id}`, {headers: headers});
            result = true;
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    async getVehicleEngines(id : number) : Promise<Engine[]> {
        const headers = getDefaultHeaders();
        let results = [];
        try {
            const response = await axios.get(`${config.REST_BASE_URL}/vehicles/${id}/engines`, {headers: headers});
            results = response.data;
        } catch (e) {
            console.log(e);
        }
        return results;
    }

    async getBrandVehicles(id : number) : Promise<Brand[]> {
        const headers = getDefaultHeaders();
        let results = [];
        try {
            const response = await axios.get(`${config.REST_BASE_URL}/brands/${id}/vehicles`, {headers: headers});
            results = response.data;
        } catch (e) {
            console.log(e);
        }
        return results;
    }
    
}
