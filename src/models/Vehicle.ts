import Brand from "./Brand";
import Engine from "./Engine";

export default interface Vehicle {

    id? : number;

    brand? : Brand;

    mainImage? : string;

    engines? : Array<Engine>;

    name? : string;

    description? : string;

    year? : number;

    weight? : number;

    doors? : number;

    segment? : string;

    basePrice? : number;

}
