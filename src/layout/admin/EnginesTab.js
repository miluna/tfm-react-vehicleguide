import React, {Component} from 'react';
import EngineService from "../../services/EngineService";
import Button from "../../components/Button";
import Select from "../../components/Select";
import Input from "../../components/Input";
import config from "../../config";

class EnginesTab extends Component {
    constructor(props) {
        super(props);
        this.engineService = new EngineService();
        this.modeOptions = [
            {id: "add", text: "Add new Engine"},
            {id: "edit", text: "Edit an Engine"},
            {id: "delete", text: "Delete an Engine"}
        ];
        this.state = {
            engines: [],
            engine: {id: null, cylinders: 0, displacement: 0, horsepower: 0, hasTurbo: false, type: "", pollution: 0,
                     energyCertificate: "", autonomy: 0},
            selectedMode: this.modeOptions[0],
            error: "",
            message: "",
            loading: false
        }
    }
    
    updateCylinders = (e) => {
        const {engine} = this.state;
        engine.cylinders = e;
        this.setState({engine});
    };
    
    updateDisplacement = (e) => {
        const {engine} = this.state;
        engine.displacement = e;
        this.setState({engine});
    };
    
    updateHorsepower = (e) => {
        const {engine} = this.state;
        engine.horsepower = e;
        this.setState({engine});
    };
    
    updateTurbo = (e) => {
        const {engine} = this.state;
        engine.hasTurbo = !engine.hasTurbo;
        this.setState({engine});
    };
    
    updateType = (e) => {
        const {engine} = this.state;
        engine.type = e;
        this.setState({engine});
    };
    
    updatePollution = (e) => {
        const {engine} = this.state;
        engine.pollution = e;
        this.setState({engine});
    };
    
    updateEnergyCertificate = (e) => {
        const {engine} = this.state;
        engine.energyCertificate = e;
        this.setState({engine});
    };
    
    updateAutonomy = (e) => {
        const {engine} = this.state;
        engine.autonomy = e;
        this.setState({engine});
    };
    
    newSelectedEngine = (e) => {
        if (e === "None") {
            this.setState({engine: {}})
        } else {
            const values = e.split(" ");
            const cylinders = Number.parseInt(values[0]);
            const displacement = Number.parseInt(values[2]);
            const horsepower = Number.parseInt(values[4]);
            const selected =
                this.state.engines
                    .filter(i =>
                        i.cylinders === cylinders &&
                        i.displacement === displacement &&
                        i.horsepower === horsepower);

            if (selected.length === 0) {
                this.setState({engine: {}})
            } else {
                this.setState({engine: selected[0]})
            }

        }
    };
    
    loadEngines = () => {
        this.engineService.getAll()
            .then(result => {
                const mappedEngines = result.map(e => {
                    return {id: e.id, text: `${e.cylinders} cylinders ${e.displacement} cc ${e.horsepower} hp`}
                });
                mappedEngines.unshift({id: null, text: "None"});
                this.setState({engines: result, mappedEngines})
            })
    };
    
    addNewEngine = () => {
        this.setState({loading: true});
        this.engineService.createOne(this.state.engine)
            .then(result => {
                this.setState({message: "Engine added succesfully", loading: false});
                this.loadEngines();
            });
    };
    
    updateEngine = () => {
        this.setState({loading: true});
        const {engine} = this.state;
        this.engineService.updateOne(engine.id, engine)
            .then(result => {
                this.setState({message: "Engine updated succesfully", loading: false});
                this.loadEngines();
            })
    };
    
    deleteEngine = () => {
        this.setState({loading: true});
        this.engineService.deleteOne(this.state.engine.id)
            .then( result => {
                this.setState({message: "Engine deleted succesfully", loading: false});
                this.loadEngines();
            });
    };

    changeMode = (e) => {
        const selected = this.modeOptions.filter(i => i.text === e)[0];
        this.setState({selectedMode: selected})
    };

    componentDidMount() {
        this.loadEngines();
    }
    
    render() {
        const {mappedEngines, selectedMode} = this.state;

        const modeSelector =
                <Select
                    id="modeSelector"
                    label="Mode selector"
                    className="is-primary"
                    options={this.modeOptions}
                    onChange={e => this.changeMode(e.target.value)}
                />;
        const engineSelector =
                <Select
                    id="modeSelector"
                    label="Select a brand"
                    className="is-success"
                    options={mappedEngines}
                    onChange={e => this.newSelectedEngine(e.target.value)}
                />;

        const cylinderInput =
            <Input
                label="Cylinders"
                className="admin-input is-fullwidth"
                placeholder="Number of cylinders"
                type="number"
                value={('' + this.state.engine.cylinders).slice(0)}
                onChange={e => this.updateCylinders(e.target.value)}
            />;
        const displInput =
            <Input
                label="Displacement"
                className="admin-input is-fullwidth"
                placeholder="Amount of displacement"
                type="number"
                value={('' + this.state.engine.displacement).slice(0)}
                onChange={e => this.updateDisplacement(e.target.value)}
            />;
        const hpInput =
            <Input
                label="Horsepower"
                className="admin-input is-fullwidth"
                placeholder="Amount of horsepower"
                type="number"
                value={('' + this.state.engine.horsepower).slice(0)}
                onChange={e => this.updateHorsepower(e.target.value)}
            />;
        const typeSelect =
            <Select id="typeSelector" options={config.vehicleTypes} onChange={e => this.updateType(e.target.value)}/>;

        const turboCheckBox =
            <Input type="checkbox" label="Is turbocharged" checked={this.state.engine.hasTurbo} onChange={e => this.updateTurbo(e.target.value)}/>;

        const pollutionInput =
            <Input
                label="Pollution"
                className="admin-input is-fullwidth"
                placeholder="Amount of pollution"
                type="number"
                value={('' + this.state.engine.pollution).slice(0)}
                onChange={e => this.updatePollution(e.target.value)}
            />;

        const autonomyInput =
            <Input
                label="Autonomy"
                className="admin-input is-fullwidth"
                placeholder="Amount of km of autonomy"
                type="number"
                value={('' + this.state.engine.autonomy).slice(0)}
                onChange={e => this.updateAutonomy(e.target.value)}
            />;

        const certificateInput =
            <Input
                label="Energy Certificate"
                className="admin-input is-fullwidth"
                placeholder="Energy certificate"
                type="text"
                value={('' + this.state.engine.energyCertificate).slice(0)}
                onChange={e => this.updateEnergyCertificate(e.target.value)}
            />;


        switch (selectedMode.id) {
            case "add":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {cylinderInput}
                        {displInput}
                        {hpInput}
                        {typeSelect}
                        {turboCheckBox}
                        {autonomyInput}
                        {pollutionInput}
                        {certificateInput}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-success is-loading" text="Add" onClick={this.addNewEngine}/>
                            :<Button className="is-success" text="Add" onClick={this.addNewEngine}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            case "edit":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {engineSelector}
                        {cylinderInput}
                        {displInput}
                        {hpInput}
                        {typeSelect}
                        {turboCheckBox}
                        {autonomyInput}
                        {pollutionInput}
                        {certificateInput}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-primary is-loading" text="Update" onClick={this.updateEngine}/>
                            : <Button className="is-primary" text="Update" onClick={this.updateEngine}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            case "delete":
                return (
                    <div className="tab-content">
                        {modeSelector}
                        {engineSelector}
                        <br/>
                        {this.state.loading
                            ? <Button className="is-danger is-loading" text="Delete" onClick={this.deleteEngine}/>
                            : <Button className="is-danger" text="Delete" onClick={this.deleteEngine}/>}
                        <br/>
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
            default:
                return (
                    <div className="tab-content">
                        {modeSelector}
                        <p style={{color: 'green'}}>{this.state.message}</p>
                        <p style={{color: 'red'}}>{this.state.error}</p>
                    </div>
                );
        }
    }
}

export default EnginesTab;
