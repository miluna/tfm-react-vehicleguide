import React, { FunctionComponent, ReactChildren } from 'react';


type ButtonProps = {
    className? : string,
    type? : string,
    size? : string,
    text: string,
    onClick: any,
    children: ReactChildren
}


const Button : FunctionComponent<ButtonProps> = (props : ButtonProps) => {
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
