import React, { ReactElement, FunctionComponent } from 'react';
import NavButton from './NavButton';
import config from "../config.json";

const logo : ReactElement<string> = (
    <div className="logo" style={{ display: "flex", flexDirection: "row" }}>
        <span/>
    </div>
);
// <img src="images/logo.png" alt="brandImage"/>
const content : ReactElement<string> = (
    <nav className="nav">
        <div className="navItem left centered">
            <h1 style={{color: "white"}} className="title">Vehicle<span style={{color: '#01d1b2'}}>Guide</span></h1>
        </div>
        <div className="navItem right">
            {config.navBarButtons.map(e => <NavButton key={e.link + "_" + e.text}
                                                      path={e.link}
                                                      iconName={e.icon}
                                                      text={e.text} />)}
        </div>
    </nav>
);


const Header : FunctionComponent<any> = () => {
    return (
        <div>
            {content}
        </div>
    );
};

export default Header;
