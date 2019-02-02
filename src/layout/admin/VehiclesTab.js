import React, {Component} from 'react';
import BrandService from "../../services/BrandService";
import VehicleService from "../../services/VehicleService";
import EngineService from "../../services/EngineService";

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
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default VehiclesTab;
