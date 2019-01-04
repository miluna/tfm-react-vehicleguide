import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Input from '../components/Input';
import Select from '../components/Select';
import { doSearch } from '../services/SearchService';
import config from "../config.json";

class Search extends Component {
    constructor(props) {
        super(props);
        this.vehicleTypes = config.vehicleTypes;
        this.orderValues = config.orderValues;
        this.orderTypes = config.orderTypes;
        this.state = {
            results: [],
            brands: [{
                id: null,
                text: "All Brands"
            }],
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

    doSearch = () => {
        const {searchName, searchType, searchBrand, searchMinPrice, searchMaxPrice, searchValueOrder, searchOrder} = this.state;
        const results = doSearch(searchName, searchType, searchBrand, searchMinPrice, searchMaxPrice, searchValueOrder, searchOrder);
        this.setState({results});
    }
    
   
    render() {
        return (
            <div className="container">
                <Input placeholder="Name of the vehicle" type="text" />
                <Select options={this.state.brands} />
                <Select options={this.vehicleTypes} />
                <Input placeholder="Minimum price" type="text" />
                <Input placeholder="Maximum price" type="text" />
                <Select options={this.orderValues} />
                <Select options={this.orderTypes} />
            </div>
        );
    }
}

export default withRouter(Search);
