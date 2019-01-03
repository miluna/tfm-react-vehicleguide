import {convertObjectToBase64, readObjectFromBase64} from './Base64';
import axios from "axios";
import config from '../config.json';
import ErrorMessage from '../models/Error';

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
    } catch(e) {
        console.log(e);
        return false;
    }
}

export function isUserAdmin() : boolean {
    // get session credentials. If non existent, is not admin
    const base64Credentials : string | null = sessionStorage.getItem(STORAGE_KEY_NAME);
    return base64Credentials !== null;
}

export function getSavedCredentials() : string | null {
    let credentials : string | null = sessionStorage.getItem(STORAGE_KEY_NAME);
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


export function validateEmail(email : string) : boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export function validateEmailAndPassword(email: string, password: string) : boolean | ErrorMessage {
    if (email === "") {
        return new ErrorMessage("Email field empty");
    }
    if (!validateEmail(email)){
        return new ErrorMessage("Email format incorrect");
    }
    if (password === "") {
        return new ErrorMessage("Password field empty");
    }
    if (password.length < 6) {
        return new ErrorMessage("Password should be more than 6 characters");
    }

    return true;
}