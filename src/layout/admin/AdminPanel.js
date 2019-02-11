import React, {Component} from 'react';
import Brands from './BrandsTab';
import Vehicles from './VehiclesTab';
import Engines from './EnginesTab';
import {withRouter} from "react-router";
import Button from "../../components/Button";


class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    title: "Brands",
                    content: <Brands/>
                },
                {
                    title: "Vehicles",
                    content: <Vehicles/>
                },
                {
                    title: "Engines",
                    content: <Engines/>
                }
            ],
            activeTabIndex: 0
        }
    }

    changeTab = (e) => {
        const text = e.target.innerHTML;
        const {tabs} = this.state;
        const selected = tabs.findIndex(e => e.title === text);
        this.setState({activeTabIndex: selected});
    };

    render() {
        const {tabs, activeTabIndex} = this.state;

        return (
            <div className="container">
                <h2 className="title">Admin Panel</h2>

                <div className="card tab-container">
                        <div className="tabs">
                            {tabs.map(e => {
                                if (tabs[activeTabIndex].title === e.title) {
                                    return <Button key={e.title} className="is-active is-primary">{e.title}</Button>
                                } else {
                                    return <Button key={e.title} onClick={this.changeTab}>{e.title}</Button>
                                }
                            })}
                        </div>

                    {tabs[activeTabIndex].content}
                </div>
            </div>
        );
    }
}

export default withRouter(AdminPanel);
