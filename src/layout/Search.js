import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Input from '../components/Input';
import Select from '../components/Select';
import { doSearch } from '../services/SearchService';

class Search extends Component {
    constructor(props) {
        super(props);
        this.vehicleTypes = [
            {
                id: null, 
                text: "All types"
            },
            {
                id: "petrol",
                text: "Petrol"
            },
            {
                id: "diesel",
                text: "Diesel"
            },
            {
                id: "electric",
                text: "Electric"
            },
            {
                id: "hybrid",
                text: "Hybrid"
            }
        ]
        this.orderValues = [
            {
                id: "price",
                text: "Order by Price"
            },
            {
                id: "name",
                text: "Order by Name"
            },
            {
                id: "year",
                text: "Order by Year"
            },
            {
                id: "displacement",
                text: "Order by Displacement"
            }
        ]
        this.orderTypes = [
            {
                id: "ASC",
                text: "Ascendant",
            },
            {
                id: "DESC",
                text: "Descendant"
            }
        ]
        this.state = {
            results: [],
            brands: [{
                id: null,
                text: "All Brands"
            }],
            searchName: null,
            searchType: this.vehicleTypes[0].id,
            searchBrand: null,
            searchMinPrice: null,
            searchMaxPrice: null,
            searchValueOrder: this.orderValues[0].id,
            searchOrder: this.orderTypes[0].id
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
