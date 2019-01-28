import React, {Component} from 'react';
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import BrandService from "../../services/BrandService";

class BrandsTab extends Component {
    constructor(props) {
        super(props);
        this.brandService = new BrandService();
        this.modeOptions = [
            {id: "add", text: "Add new Brand"},
            {id: "edit", text: "Edit a Brand"},
            {id: "delete", text: "Delete a Brand"}
        ];
        this.state = {
            brands: [],
            brand: {name:"", year:0, country:""},
            selectedMode: this.modeOptions[0],
            error: "",
            message: "",
            loading: false
        }
    }

    updateName = (e) => {
        const {brand} = this.state;
        brand.name = e;
        this.setState({brand});
    };

    updateYear = (e) => {
        const {brand} = this.state;
        brand.year = e;
        this.setState({brand});
    };
    
    updateCountry = (e) => {
        const {brand} = this.state;
        brand.country = e;
        this.setState({brand});
    };

    changeMode = (e) => {
        const selected = this.modeOptions.filter(i => i.text === e)[0];
        this.setState({selectedMode: selected})
    };

    newSelectedBrand = (e) => {
        if (e === "None") {
            this.setState({brand: {}})
        } else {
            const selected = this.state.brands.filter(i => i.name === e)[0];
            this.setState({brand: selected})
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

    addNewBrand = () => {
        this.setState({loading: true});
        this.brandService.createOne(this.state.brand)
            .then(result => {
                this.setState({message: "Brand added succesfully", loading: false});
                this.loadBrands();
            });
    };

    updateBrand = () => {
        this.setState({loading: true});
        const {brand} = this.state;
        this.brandService.updateOne(brand.id, brand)
            .then(result => {
                this.setState({message: "Brand updated succesfully", loading: false});
                this.loadBrands();
            })
    };

    deleteBrand = () => {
        this.setState({loading: true});
        this.brandService.deleteOne(this.state.brand.id)
            .then( result => {
                this.setState({message: "Brand deleted succesfully", loading: false});
                this.loadBrands();
            });
    };

    componentDidMount() {
        this.loadBrands();
    }

    render() {
        const {mappedBrands, selectedMode} = this.state;

        const modeSelector =
            <div style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
                <label>Mode selector</label>
                <Select id="modeSelector" className="is-primary" options={this.modeOptions} onChange={e => this.changeMode(e.target.value)} />
            </div>;
        const brandSelector =
            <div style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
                <label>Select a brand</label>
                <Select id="modeSelector" className="is-success" options={mappedBrands} onChange={e => this.newSelectedBrand(e.target.value)} />
            </div>;
        const nameInput =
            <div style={{marginTop: '0.3rem', marginBottom: '0.3rem', width: '85%'}}>
                <label>Name of the brand</label>
                <Input
                    className="admin-input is-fullwidth"
                    placeholder="Brand name"
                    value={('' + this.state.brand.name).slice(0)}
                    onChange={e => this.updateName(e.target.value)}/>
            </div>;
        const yearInput =
            <div style={{marginTop: '0.3rem', marginBottom: '0.3rem', width: '85%'}}>
                <label>Year of birth</label>
                <Input
                    type="number"
                    className="admin-input is-fullwidth"
                    placeholder="Year of birth"
                    value={('' + this.state.brand.year).slice(0)}
                    onChange={e => this.updateYear(e.target.value)}/>
            </div>;
        const countryInput =
            <div style={{marginTop: '0.3rem', marginBottom: '0.3rem', width: '85%'}}>
                <label>Year of birth</label>
                <Input
                    className="admin-input is-fullwidth"
                    placeholder="Country"
                    value={('' + this.state.brand.country).slice(0)}
                    onChange={e => this.updateCountry(e.target.value)}/>
            </div>;
            
            
        switch (selectedMode.id) {
            case "add":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {nameInput}
                        {yearInput}
                        {countryInput}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-success is-loading" text="Add" onClick={this.addNewBrand}/>
                            :<Button className="is-success" text="Add" onClick={this.addNewBrand}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            case "edit":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {brandSelector}
                        {nameInput}
                        {yearInput}
                        {countryInput}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-primary is-loading" text="Update" onClick={this.updateBrand}/>
                            : <Button className="is-primary" text="Update" onClick={this.updateBrand}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            case "delete":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {brandSelector}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-danger is-loading" text="Delete" onClick={this.deleteBrand}/>
                            : <Button className="is-danger" text="Delete" onClick={this.deleteBrand}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
        }
    }
}

export default BrandsTab;
