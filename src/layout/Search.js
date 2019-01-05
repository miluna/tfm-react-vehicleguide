import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Input from '../components/Input';
import Select from '../components/Select';
import config from "../config.json";
import ProductCard from '../components/ProductCard';
import BrandService from '../services/BrandService';
import SearchService from '../services/SearchService';

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
                orderValue: null,
                order: null
            }
        }
    }

    mapToSelectOption = (id, text) => {
        const option = {id, text}
        return option;
    }

    doSearch = () => {
        const { searchObject } = this.state;
        const results = this.searchService.doSearch(searchObject);
        this.setState({results});
    }
    
    updateName = (event) => {
        this.setState({searchObject: {name: event.target.value}});
    }

    updateBrand = (event) => {
        const text = event.target.value;
        const selected = this.state.brands.filter(brand => brand.name === text);

        if (selected.length > 0) {
            console.log(selected[0]);
            this.setState({searchObject: {brand : selected[0]}});
        }
    }

    componentDidMount() {
        const defaultBrand = {
            id: null,
            name: "All Brands"
        }
        this.brandService.getAll()
            .then((results) => {
                results.unshift(defaultBrand);
                this.setState({brands: results});
            })
        
    }
   
    render() {
        const { results, brands } = this.state;
        const brandSelectOptions = brands.map(e => this.mapToSelectOption(e.id, e.name));

        const searchElements = results.map(e => <ProductCard vehicle={e} />)

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
                                options={brandSelectOptions} 
                                onChange={this.updateBrand}
                            />
                        </div>
                        <div className="column">
                            <Select 
                                options={this.vehicleTypes} 
                            />
                        </div>
                        <div className="column">
                            <Input placeholder="Minimum price" type="text" />
                        </div>
                        <div className="column">
                            <Input placeholder="Maximum price" type="text" />
                        </div>
                        <div className="column">
                            <Select options={this.orderValues} />
                        </div>
                        <div className="column">
                            <Select options={this.orderTypes} />
                        </div>
                    </div>
                </div>
                <div>
                    {searchElements}
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
