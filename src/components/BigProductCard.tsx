import React, {FunctionComponent, CSSProperties} from 'react';
import noImage from '../media/images/no-available-image.png';
import Vehicle from "../models/Vehicle";

const ProductCard: FunctionComponent<Vehicle> = ({id, brand, engines, name, description, year, doors, segment, basePrice, mainImage}: Vehicle) => {

    const imageUrl = mainImage ? `url("${mainImage}")` : `url("${noImage}")`;
    const stl: CSSProperties = {
        backgroundImage: imageUrl
    };

    const title = brand ? `${brand.name} ${name} - ${year}` : `${name} - ${year}`;

    return (
        <section className="card">
            sdfdbslgfijlhñjdsipjfidsuphgiupfdhgsdf
            <div className="card-content product-grid">
                <div className="product-image-container">
                    <div className="product-image" style={stl}/>
                </div>

                <div className="product-information">
                    <h1 className="title">
                        {title}
                    </h1>
                    <p>{description}</p>
                    <br/>
                    <p>{`Segment ${segment}`}</p>
                    <p>{`Price starting at ${basePrice}`}</p>
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
