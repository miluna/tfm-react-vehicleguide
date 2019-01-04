import {Link} from "react-router-dom";
import Button from "./Button";
import Icon from "./Icon";
import React, { FunctionComponent, ReactElement } from "react";
import NavButtonProps from "./propModels/NavButtonProps";

const NavButton : FunctionComponent<NavButtonProps> = 
({ path, iconName, text}: NavButtonProps) : ReactElement<NavButtonProps> => {
    return (
        <div style={{ margin: "2%" }}>
            <Link to={path}>
                <Button type="dark">
                    <Icon iconName={iconName}/>
                    {text}
                </Button>
            </Link>
        </div>
    );
};

export default NavButton
