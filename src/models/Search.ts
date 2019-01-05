import Brand from "./Brand";

export default interface Search {

    name? : string;

    type? : string; 

    brand?: Brand;

    minPrice? : string;

    maxPrice? : string;

    orderValue? : string;

    order? : string;
}
