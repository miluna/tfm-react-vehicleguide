import React, { FunctionComponent, ReactElement } from 'react';
import InputProps from './propModels/InputProps';

const Input : FunctionComponent<InputProps> = 
({className, placeholder, type, min, max, value, onChange, onKeyPress}: InputProps) : ReactElement<InputProps> => {
    const inputComponent = (min || max) ?
        <input className={className ? ("input " + className) : "input"}
               placeholder={placeholder}
               type={type}
               min={min}
               max={max}
               value={value}
               onChange={onChange}
               onKeyPress={onKeyPress}/> :
        <input className={className ? ("input " + className) : "input"}
               placeholder={placeholder}
               type={type}
               onChange={onChange}
               onKeyPress={onKeyPress}/>;

    return (
        <div>
            {inputComponent}
        </div>
    );
};

export default Input;
