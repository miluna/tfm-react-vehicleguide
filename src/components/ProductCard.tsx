import React, { FunctionComponent } from 'react';
import SearchResult from '../models/SearchResult';
import { Link } from 'react-router-dom';

const ProductCard : FunctionComponent<SearchResult> = ({id, name, year, segment, basePrice} : SearchResult) => {
    return (
        <Link to={`/products/${id}`} >
            <section className="hero">
                <div className="hero-body container">
                    <div className="product-container">
                        <div className="product-information">
                            <h1 className="title">
                                {name}
                            </h1>
                            <p>{`Year ${year}`}</p>
                            <p>{`Segment ${segment}`}</p>
                            <p>{`Price starting at ${basePrice}`}</p>
                        </div>
                    </div>
                </div>
            </section>
        </Link>
    );
};

export default ProductCard;
