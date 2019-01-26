import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Select from "../components/Select";
import Slider from "../components/Slider";
import Video from "../components/Video";
// import sourceVideo from "../media/videos/home_video.mp4"
import Button from "../components/Button";
import BrandService from "../services/BrandService";
import VehicleService from "../services/VehicleService";

const sourceVideo = null;
class Home extends Component {
    constructor(props) {
        super(props);
        this.brandService = new BrandService();
        this.vehicleService = new VehicleService();
        this.state = {
            searchError: "",
            selectedBrand: null,
            selectedModel: null,
            selectedMinimumPrice: null,
            selectedMaximumPrice: null,
            brandOptions: [],
            vehicleOptions: []
        }
    }

    updateSelected = (e) => {

        switch (e.target.id) {
            case "brand":
                if (e.target.value === "All Brands") this.setState({selectedBrand : null});
                else this.searchBrandModels(e.target.value);
                break;
            case "model":
                if (e.target.value === "All Models") this.setState({selectedModel: null});
                else this.setState({selectedModel: e.target.value});
                break;
            case "minPrice":
                this.setState({selectedMinimumPrice: e.target.value});
                this.validateValues();
                break;
            case "maxPrice":
                this.setState({selectedMaximumPrice: e.target.value});
                this.validateValues();
                break;
            default:
                console.log("You must set a proper typeChange value. Nothing updated");
                break;
        }
    };

    validateValues = () => {

        const {searchError, selectedMinimumPrice, selectedMaximumPrice} = this.state;
        let errorText = "";

        if (selectedMinimumPrice !== null && selectedMaximumPrice !== null) {
            if (parseInt(selectedMinimumPrice) >= parseInt(selectedMaximumPrice))
                errorText = "Minimum price cannot be higher than maximum price";
        }

        if (errorText !== searchError) this.setState({searchError: errorText});
    };

    customSearch = () => {
        return null;
    };

    searchBrandModels = (brand) => {
        const brandObject = this.state.brandOptions.filter(e => e.text === brand)[0];
        this.vehicleService.getBrandVehicles(brandObject.id)
            .then(vehicles => {
                const vehicleOpts = vehicles.map(e => {
                    return {
                        id: e.id,
                        text: e.name
                    }
                });
                this.setState({
                    selectedBrand: brand,
                    vehicleOptions: vehicleOpts
                });
            })

    };

    componentDidMount() {
        this.brandService.getAll()
            .then(brands => {
                const brandOpts = brands.map(e => {
                    return {
                        id: e.id,
                        text: e.name
                    }
                });
                this.setState({brandOptions: brandOpts})
            })
    }

    render() {
        const {brandOptions, searchError, vehicleOptions, selectedMinimumPrice, selectedMaximumPrice} = this.state;
        if (brandOptions.length === 0 || brandOptions[0].text !== "All Brands") brandOptions.unshift({id: null, text: "All Brands"});
        if (vehicleOptions.length === 0 || vehicleOptions[0].text !== "All Vehicles") vehicleOptions.unshift({id: null, text: "All Vehicles"});

        return (
            <div>
                <section id="home-video">
                    <div className="video-box">
                        <div className="overlay">
                            <div className="text-overlay">
                                <h1 style={{color: "white", fontSize: "3.25rem"}} className="title"
                                >Find The Vehicle Of Your Dreams</h1>
                                <div className="row">
                                    <div className="columna row-item">
                                        <Select id="brand" options={brandOptions} onChange={this.updateSelected}/>
                                        {selectedMinimumPrice ? <p>Minimum price: {selectedMinimumPrice} €</p> : <p>Minimum price</p>}
                                        <Slider id="minPrice" onChange={this.updateSelected} min={1000} max={50000}/>
                                    </div>
                                    <div className="columna row-item">
                                        <Select id="model" options={vehicleOptions} onChange={this.updateSelected}/>
                                        {selectedMaximumPrice ? <p>Maximum price: {selectedMaximumPrice} €</p> : <p>Maximum price</p>}
                                        <Slider id="maxPrice" onChange={this.updateSelected} min={1000} max={200000}/>
                                    </div>
                                </div>
                                <div className="row">
                                    {(searchError === "") ?
                                        <Button type="primary is-success" text="Search" onClick={this.customSearch}/> :
                                        <Button type="primary is-danger" text="Search"/>
                                    }
                                </div>
                                <p id="searchError" style={{color: "red"}}>{searchError}</p>
                            </div>
                            <Video className="home-video" width={1280} height={720} source={sourceVideo}/>
                        </div>
                        <div className="container is-widescreen is-centered">
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default withRouter(Home);
