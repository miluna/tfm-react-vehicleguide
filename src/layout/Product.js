import React, {Component} from 'react';
import BigProductCard from "../components/BigProductCard";
import {withRouter} from "react-router-dom";
import VehicleService from "../services/VehicleService";
import Loading from "../components/Loading";

class Product extends Component {
    constructor(props) {
        super(props);
        this.vehicleService = new VehicleService();
        this.state = {
            car: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.vehicleService.getOne(id)
            .then(car => this.setState({car}))
    }

    render() {
        const {car} = this.state;

        const content = car === null

            ? <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Loading/>
              </div>

            : <BigProductCard
                id={car.id}
                name={car.name}
                brand={car.brand}
                mainImage={car.mainImage}
                description={car.description}
                engines={car.engines}
                doors={car.doors}
                segment={car.segment}
                weight={car.weight}
                year={car.year}
                basePrice={car.basePrice}
            />;

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default withRouter(Product);
