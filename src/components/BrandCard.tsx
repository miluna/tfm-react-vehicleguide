import React, {FunctionComponent, CSSProperties} from 'react';
import noImage from '../media/images/no-available-image.png';
import Brand from "../models/Brand";

const BrandCard: FunctionComponent<Brand> = (brand: Brand) => {

    // const imageUrl = brand.image ? `url("${brand.image}")` : `url("${noImage}")`;
    const imageUrl = `url("${noImage}")`;
    const stl: CSSProperties = {
        backgroundImage: imageUrl
    };

    return (
        <div className="product-container">
            <div className="card-content">
                <h1 className="title">
                    About the brand
                </h1>
                <div className="product-grid centered">
                    <div className="product-image-container">
                        <div className="product-image" style={stl}/>
                    </div>
                    <div className="product-information">
                        <h2 className="subtitle">{brand.name}</h2>
                        <p><strong>Country: {brand.country}</strong></p>
                        {brand.year && <p><strong>Born in: {brand.year}</strong></p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandCard;
