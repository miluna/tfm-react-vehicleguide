import React, {FunctionComponent, CSSProperties} from 'react';
import noImage from '../media/images/no-available-image.png';
import Vehicle from "../models/Vehicle";

const ProductCard: FunctionComponent<Vehicle> = ({id, brand, engines, name, description, year, doors, segment, basePrice, mainImage}: Vehicle) => {

    const imageUrl = mainImage ? `url("${mainImage}")` : `url("${noImage}")`;
    const stl: CSSProperties = {
        backgroundImage: imageUrl
    };

    const title = brand ? `${brand.name} ${name}` : `${name}`;

    return (
        <div className="product-container">
            <div className="card-content product-grid centered">
                <div className="product-image-container">
                    <div className="product-image" style={stl}/>
                </div>
                <div className="product-information">
                    <h1 className="subtitle">{title}</h1>
                    <p>{description}</p>
                    <br/>
                    <p><strong>Year: {year}</strong></p>
                    <p><strong>Segment: {segment}</strong></p>
                    <p><strong>Price starting at: {basePrice}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
