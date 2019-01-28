import React, {Component} from 'react';
import EngineService from "../../services/EngineService";
import Button from "../../components/Button";
import Select from "../../components/Select";

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
        engine.hasTurbo = e;
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
            const selected = this.state.engines.filter(i => i.name === e)[0];
            this.setState({engine: selected})
        }
    };
    
    loadEngines = () => {
        this.engineService.getAll()
            .then(result => {
                const mappedEngines = result.map(e => {
                    return {id: e.id, text: `${e.cylinders} cylinders ${e.displacement} cc ${e.horsepower} hp`}
                });
                mappedEngines.unshift({id: null, text: "None"});
                this.setState({brands: result, mappedEngines})
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
    
    componentDidMount() {
        this.loadEngines();
    }
    
    render() {
        const {mappedEngines, selectedMode} = this.state;
    
        const modeSelector =
            <div style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
                <label>Mode selector</label>
                <Select id="modeSelector" className="is-primary" options={this.modeOptions} onChange={e => this.changeMode(e.target.value)} />
            </div>;
        const engineSelector =
            <div style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
                <label>Select a brand</label>
                <Select id="modeSelector" className="is-success" options={mappedEngines} onChange={e => this.newSelectedEngine(e.target.value)} />
            </div>;
        
        switch (selectedMode.id) {
            case "add":
                return (
                    <div className="tab-content">
                        {modeSelector}
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
        }
    }
}

export default EnginesTab;
