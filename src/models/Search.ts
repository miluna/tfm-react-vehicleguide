import Brand from "./Brand";
import { SelectOption } from "../components/propModels/SelectProps";

export default interface Search {

    name? : string;

    type? : SelectOption; 

    brand?: Brand;

    minPrice? : string;

    maxPrice? : string;

    orderValue? : SelectOption;

    order? : SelectOption;
}
