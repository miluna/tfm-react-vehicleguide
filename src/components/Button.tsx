import React, { FunctionComponent, ReactElement } from 'react';
import ButtonProps from './propModels/ButtonProps';


const Button : FunctionComponent<ButtonProps> = (props : ButtonProps) : ReactElement<ButtonProps> => {
    let { className, type, size, text, onClick, children } = props;
    if (className) className += " button"; else className = "button";
    if (type) className += " is-" + type;
    if (size) className += " is-" + size;

    return (
        <div className={className} onClick={onClick}>
            {children || text}
        </div>
    );
};

export default Button;
