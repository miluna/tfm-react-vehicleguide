import React, { ReactElement, FunctionComponent } from 'react';
import NavButton from './NavButton';
import Logo from './Logo';
import config from "../config.json";

const content : ReactElement<string> = (
    <nav className="nav">
        <div className="navItem left centered">
            <Logo/>
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
