import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Input from '../components/Input';
import Select from '../components/Select';
import config from "../config.json";
import ProductCard from '../components/ProductCard';
import BrandService from '../services/BrandService';
import SearchService from '../services/SearchService';
import Button from '../components/Button';
import Loading from '../components/Loading';

class Search extends Component {
    constructor(props) {
        super(props);
        this.brandService = new BrandService();
        this.searchService = new SearchService();
        this.vehicleTypes = config.vehicleTypes;
        this.orderValues = config.orderValues;
        this.orderTypes = config.orderTypes;
        this.state = {
            results: [],
            brands: [],
            searchObject: {
                name: null,
                type: null,
                brand: null,
                minPrice: null,
                maxPrice: null,
                orderValue: this.orderValues[0],
                order: this.orderTypes[0]
            }
        }
    }

    mapToSelectOption = (id, text) => {
        return {id, text};
    };

    doSearch = () => {
        const { searchObject } = this.state;
        this.searchService.doSearch(searchObject)
            .then((results) => {
                this.setState({results});
            })
    };
    
    updateName = (event) => {
        const s = this.state.searchObject;
        s.name = event.target.value;
        this.setState({searchObject: s});
    };

    updateBrand = (event) => {
        const text = event.target.value;
        const selected = this.state.brands.filter(brand => brand.name === text);

        if (selected.length > 0) {
            const s = this.state.searchObject;
            s.brand = selected[0];
            this.setState({searchObject: s});
        }
    };

    updateType = (event) => {
        const text = event.target.value;
        const selected = this.vehicleTypes.filter(type => type.text === text);
        if (selected.length > 0) {
            const s = this.state.searchObject;
            s.type = selected[0];
            this.setState({searchObject: s});
        }
    };

    updateMinPrice = (event) => {
        const value = event.target.value;
        const s = this.state.searchObject;
        s.minPrice = value;
        this.setState({searchObject: s});
    };

    updateMaxPrice = (event) => {
        const value = event.target.value;
        const s = this.state.searchObject;
        s.maxPrice = value;
        this.setState({searchObject: s});
    };

    updateOrderValue = (event) => {
        const text = event.target.value;
        const selected = this.orderValues.filter(type => type.text === text);
        if (selected.length > 0) {
            const s = this.state.searchObject;
            s.orderValue = selected[0];
            this.setState({searchObject: s});
        }
    };

    updateOrderType = (event) => {
        const text = event.target.value;
        const selected = this.orderTypes.filter(type => type.text === text);
        if (selected.length > 0) {
            const s = this.state.searchObject;
            s.order = selected[0];
            this.setState({searchObject: s});
        }
    };

    componentDidMount() {
        const defaultBrand = {
            id: null,
            name: "All Brands"
        };
        this.brandService.getAll()
            .then(brands => {
                brands.unshift(defaultBrand);
                this.searchService.doSearch(this.state.searchObject)
                    .then(results => {
                        this.setState({brands: brands, results: results});
                    })
            });
    }
   
    render() {
        const { results, brands } = this.state;
        const brandSelectOptions = brands.map(e => this.mapToSelectOption(e.id, e.name));
        const searchElements = results.map(e => <ProductCard 
            key={e.id} 
            id={e.id} 
            brand={e.brand} 
            mainImage={e.mainImage} 
            description={e.description}
            name={e.name} 
            year={e.year} 
            segment={e.segment} 
            basePrice={e.basePrice}  
        />);

        console.log(this.state);
        return (
            <div className="container">
                <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
                    <div className="columns">
                        <div className="column">
                            <Input 
                                placeholder="Name of the vehicle" 
                                type="text" 
                                onChange={(e) => this.updateName(e)}
                            />
                        </div>
                        <div className="column">
                            <Select
                                id="brand-select"
                                options={brandSelectOptions} 
                                onChange={this.updateBrand}
                            />
                        </div>
                        <div className="column">
                            <Select
                                id="vehicle-type-select"
                                options={this.vehicleTypes} 
                                onChange={this.updateType}
                            />
                        </div>
                        <div className="column">
                            <Input 
                                placeholder="Minimum price" 
                                type="number" 
                                onChange={this.updateMinPrice}
                            />
                        </div>
                        <div className="column">
                            <Input 
                                placeholder="Maximum price" 
                                type="number" 
                                onChange={this.updateMaxPrice}
                            />
                        </div>
                        <div className="column">
                            <Select
                                id="order-values-select"
                                options={this.orderValues} 
                                onChange={this.updateOrderValue}
                            />
                        </div>
                        <div className="column">
                            <Select
                                id="order-type-select"
                                options={this.orderTypes} 
                                onChange={this.updateOrderType}
                            />
                        </div>
                        <div className="column">
                            <Button 
                                className="is-primary is-fullwidth" 
                                text="Search" 
                                onClick={this.doSearch}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {searchElements.length > 0 ? searchElements : <Loading height="80vh" fontSize="3rem"/>}
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
