import Brand from "./Brand";
import Engine from "./Engine";

export default class Vehicle {

    id? : number;

    brand? : Brand;

    engines? : Array<Engine>;

    name? : string;

    description? : string;

    year? : number;

    weight? : number;

    doors? : number;

    segment? : string;

    basePrice? : number;

}
