import {convertObjectToBase64, readObjectFromBase64} from './Base64';
import axios from "axios";
import config from '../config';

export const STORAGE_KEY_NAME : string = "cred";

export async function login(email : string, password : string) : Promise<boolean> {
    // send credentials and get authorization token
    const headers = getDefaultHeaders();
    try {
        const res = await axios.post(`${config.REST_BASE_URL}/login`, {email: email, password: password}, {headers: headers})
        const authToken : string = res.data["Authorization"];
        // save token to session storage
        sessionStorage.setItem(STORAGE_KEY_NAME, convertObjectToBase64(authToken));
        return true;
    } catch(error) {
        return false;
    }
}

export function isUserAdmin() : boolean {
    // get session credentials. If non existent, is not admin
    const base64Credentials : string = sessionStorage.getItem(STORAGE_KEY_NAME);
    return base64Credentials !== null;
}

export function getSavedCredentials() : string {
    let credentials : string = sessionStorage.getItem(STORAGE_KEY_NAME);
    return (credentials !== null) ? readObjectFromBase64(credentials) : credentials;
}


export function getAuthHeader() : Object {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: getSavedCredentials()
    };
}

export function getDefaultHeaders() : Object {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}
