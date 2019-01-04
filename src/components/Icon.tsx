import React, { FunctionComponent, ReactElement } from 'react';
import IconProps from './propModels/IconProps';

const Icon : FunctionComponent<IconProps> = ({ iconName } : IconProps) : ReactElement<IconProps> => {
    let iconClass = "fa fa-";
    if (iconName) iconClass+= iconName;
    return (
        <span className="icon" style={{margin: "2%"}}>
            <i className={iconClass}/>
        </span>
    );
};

export default Icon;
