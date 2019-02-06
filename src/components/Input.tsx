import React, { FunctionComponent, ReactElement } from 'react';
import InputProps from './propModels/InputProps';

const Input : FunctionComponent<InputProps> = 
({className, placeholder, type, min, max, value, onChange, onKeyPress, label}: InputProps) : ReactElement<InputProps> => {

    const labelComponent = label ? <label>{label}</label> : null;

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
               value={value}
               onChange={onChange}
               onKeyPress={onKeyPress}/>;

    return (
        <div style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
            {labelComponent}
            {inputComponent}
        </div>
    );
};

export default Input;
