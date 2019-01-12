import React, { FunctionComponent, CSSProperties } from 'react';
import SearchResult from '../models/SearchResult';
import noImage from '../media/images/no-available-image.png';
import { Link } from 'react-router-dom';

const ProductCard: FunctionComponent<SearchResult> = ({ id, brand, name, description, year, segment, basePrice, mainImage }: SearchResult) => {

    const imageUrl = mainImage ? `url("${mainImage}")` : `url("${noImage}")`;
    const stl: CSSProperties = {
        backgroundImage: imageUrl
    };

    const title = brand? `${brand.name} ${name} - ${year}` : `${name} - ${year}`

    return (
        <Link to={`/products/${id}`} >
            <section className="card product-container">
                <div className="card-content product-grid">
                    <div className="product-image-container">
                        <div className="product-image" style={stl} />
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
        </Link>
    );
};

export default ProductCard;
