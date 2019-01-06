import Brand from "./Brand";

export default interface SearchResult {
    id?: number,
    brand?: Brand,
    name?: string,
    description?: string,
    year?: number,
    basePrice?: number,
    segment?: string
    mainImage?: string
}
