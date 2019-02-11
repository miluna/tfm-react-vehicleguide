import React, {Component} from 'react';
import BrandService from "../../services/BrandService";
import VehicleService from "../../services/VehicleService";
import EngineService from "../../services/EngineService";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";

class VehiclesTab extends Component {
    constructor(props) {
        super(props);
        this.brandService = new BrandService();
        this.engineService = new EngineService();
        this.vehicleService = new VehicleService();
        this.modeOptions = [
            {id: "add", text: "Add new Vehicle"},
            {id: "edit", text: "Edit a Vehicle"},
            {id: "delete", text: "Delete a Vehicle"}
        ];
        this.state = {
            mappedBrands: [],
            mappedVehicles: [],
            brands: [],
            engines: [],
            vehicles: [],
            vehicle: {brand:{}, engines:[],
                mainImage: "", name:"", description: "", year:0, weight:0, doors:0, segment:"", basePrice: 0},
            selectedMode: this.modeOptions[0],
            error: "",
            message: "",
            loading: false
        }
    }

    updateMainImage = (e) => {
        const {vehicle} = this.state;
        vehicle.mainImage = e;
        this.setState({vehicle});
    };

    updateName = (e) => {
        const {vehicle} = this.state;
        vehicle.name = e;
        this.setState({vehicle});
    };

    updateDescription = (e) => {
        const {vehicle} = this.state;
        vehicle.description = e;
        this.setState({vehicle});
    };

    updateYear = (e) => {
        const {vehicle} = this.state;
        vehicle.year = e;
        this.setState({vehicle});
    };

    updateWeight = (e) => {
        const {vehicle} = this.state;
        vehicle.weight = e;
        this.setState({vehicle});
    };

    updateDoors = (e) => {
        const {vehicle} = this.state;
        vehicle.doors = e;
        this.setState({vehicle});
    };

    updateSegment = (e) => {
        const {vehicle} = this.state;
        vehicle.segment = e;
        this.setState({vehicle});
    };

    updateBasePrice = (e) => {
        const {vehicle} = this.state;
        vehicle.basePrice = e;
        this.setState({vehicle});
    };

    changeMode = (e) => {
        const selected = this.modeOptions.filter(i => i.text === e)[0];
        this.setState({selectedMode: selected})
    };

    newSelectedBrand = (e) => {
        const {vehicle} = this.state;
        if (e === "None") {
            vehicle.brand.id = null;
        } else {
            const selected = this.state.brands.filter(i => i.name === e)[0];
            vehicle.brand.id = selected.id;
        }
        this.setState({vehicle})
    };

    newSelectedVehicle = (e) => {
        if (e === "None") {
            this.setState({vehicle: {}})
        } else {
            const selected = this.state.vehicles.filter(i => i.name === e)[0];
            this.setState({vehicle: selected})
        }
    };

    loadBrands = () => {
        this.brandService.getAll()
            .then(result => {
                const mappedBrands = result.map(e => {
                    return {id: e.id, text: e.name}
                });
                mappedBrands.unshift({id: null, text: "None"});
                this.setState({brands: result, mappedBrands})
            })
    };

    loadEngines = () => {
        this.engineService.getAll()
            .then(result => {
                const mappedEngines = result.map(e => {
                    const text = e.hasTurbo
                    ? `${e.cylinders} cylinders ${e.displacement}cc ${e.horsepower}hp ${e.type} turbocharged`
                    : `${e.cylinders} cylinders ${e.displacement}cc ${e.horsepower}hp ${e.type}`;
                    return {id: e.id, text}
                });
                mappedEngines.unshift({id: null, text: "None"});
                this.setState({vehicles: result, mappedEngines})
            })
    };

    newSelectedEngine = (e) => {
        const {vehicle} = this.state;
        if (e === "None") {
            vehicle.brand.id = null;
        } else {
            const selected = this.state.brands.filter(i => i.name === e)[0];
            vehicle.brand.id = selected.id;
        }
        this.setState({vehicle})
    };

    loadVehicles = () => {
        this.vehicleService.getAll()
            .then(result => {
                const mappedVehicles = result.map(e => {
                    return {id: e.id, text: e.name}
                });
                mappedVehicles.unshift({id: null, text: "None"});
                this.setState({vehicles: result, mappedVehicles})
            })
    };

    addNewVehicle = () => {
        this.setState({loading: true});
        this.vehicleService.createOne(this.state.vehicle)
            .then(result => {
                this.setState({message: "Vehicle added succesfully", loading: false});
                this.loadVehicles();
            });
    };

    updateVehicle = () => {
        this.setState({loading: true});
        const {vehicle} = this.state;
        this.vehicleService.updateOne(vehicle.id, vehicle)
            .then(result => {
                this.setState({message: "Vehicle updated succesfully", loading: false});
                this.loadVehicles();
            })
    };

    deleteVehicle = () => {
        this.setState({loading: true});
        this.vehicleService.deleteOne(this.state.vehicle.id)
            .then( result => {
                this.setState({message: "Vehicle deleted succesfully", loading: false});
                this.loadVehicles();
            });
    };

    componentDidMount() {
        this.loadBrands();
        this.loadVehicles();
    }

    render() {
        const {mappedBrands, mappedVehicles, selectedMode} = this.state;

        const modeSelector =
            <Select
                label="Mode selector"
                id="modeSelector"
                className="is-primary"
                options={this.modeOptions}
                onChange={e => this.changeMode(e.target.value)}
            />;
        const vehicleSelector =
            <Select
                label="Select a vehicle"
                id="modeSelector1"
                className="is-success"
                options={mappedVehicles}
                onChange={e => this.newSelectedVehicle(e.target.value)}
            />;
        const brandSelector =
            <Select
                label="Select a brand"
                id="modeSelector2"
                className="is-success"
                options={mappedBrands}
                onChange={e => this.newSelectedBrand(e.target.value)}
            />;

        const mainImageInput =
            <Input
                label="Main Image URL"
                className="admin-input is-fullwidth"
                placeholder="Main Image URL"
                value={('' + this.state.vehicle.mainImage).slice(0)}
                onChange={e => this.updateMainImage(e.target.value)}
            />;
        const nameInput =
            <Input
                label="Name of the vehicle"
                className="admin-input is-fullwidth"
                placeholder="Vehicle name"
                value={('' + this.state.vehicle.name).slice(0)}
                onChange={e => this.updateName(e.target.value)}
            />;
        const descrInput =
            <Input
                label="Description of the vehicle"
                className="admin-input is-fullwidth"
                placeholder="Description"
                value={('' + this.state.vehicle.description).slice(0)}
                onChange={e => this.updateDescription(e.target.value)}
            />;
        const yearInput =
            <Input
                label="Year of the model"
                type="number"
                className="admin-input is-fullwidth"
                placeholder="Year"
                value={('' + this.state.vehicle.year).slice(0)}
                onChange={e => this.updateYear(e.target.value)}
            />;
        const weightInput =
            <Input
                label="Weight of the vehicle"
                type="number"
                className="admin-input is-fullwidth"
                placeholder="Weight (kg)"
                value={('' + this.state.vehicle.weight).slice(0)}
                onChange={e => this.updateWeight(e.target.value)}
            />;
        const doorsInput =
            <Input
                label="Number of doors"
                type="number"
                className="admin-input is-fullwidth"
                placeholder="Doors"
                value={('' + this.state.vehicle.doors).slice(0)}
                onChange={e => this.updateDoors(e.target.value)}
            />;
        const segmentInput =
            <Input
                label="Segment"
                type="number"
                className="admin-input is-fullwidth"
                placeholder="Segment"
                value={('' + this.state.vehicle.segment).slice(0)}
                onChange={e => this.updateSegment(e.target.value)}
            />;
        const priceInput =
            <Input
                label="Base price of the model"
                type="number"
                className="admin-input is-fullwidth"
                placeholder="Base price"
                value={('' + this.state.vehicle.basePrice).slice(0)}
                onChange={e => this.updateBasePrice(e.target.value)}
            />;

        // Return based on selected mode
        switch (selectedMode.id) {
            case "add":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {brandSelector}
                        {mainImageInput}
                        {nameInput}
                        {descrInput}
                        {yearInput}
                        {weightInput}
                        {doorsInput}
                        {segmentInput}
                        {priceInput}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-success is-loading" text="Add" onClick={this.addNewVehicle}/>
                            :<Button className="is-success" text="Add" onClick={this.addNewVehicle}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            case "edit":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {vehicleSelector}
                        {brandSelector}
                        {mainImageInput}
                        {nameInput}
                        {descrInput}
                        {yearInput}
                        {weightInput}
                        {doorsInput}
                        {segmentInput}
                        {priceInput}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-primary is-loading" text="Update" onClick={this.updateVehicle}/>
                            : <Button className="is-primary" text="Update" onClick={this.updateVehicle}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            case "delete":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {vehicleSelector}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-danger is-loading" text="Delete" onClick={this.deleteVehicle}/>
                            : <Button className="is-danger" text="Delete" onClick={this.deleteVehicle}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            default:
                return (
                    <div className="tab-content">
                        {modeSelector}
                    </div>
                );
        }
    }
}

export default VehiclesTab;
