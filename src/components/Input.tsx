import React, { FunctionComponent, ReactElement } from 'react';
import InputProps from './propModels/InputProps';

const Input : FunctionComponent<InputProps> = 
({className, placeholder, type, min, max, value, onChange, onKeyPress, label, checked}: InputProps) : ReactElement<InputProps> => {

    const labelComponent = label ? <label>{label}</label> : null;

    let inputComponent = (min || max) ?
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
   // check if it is a checkbox input
   inputComponent = (type === "checkbox") ?
        <input style={{marginLeft: '1rem', width: '1rem', height: '1rem'}}
               checked={checked}
               type={type}
               value={value}
               onChange={onChange}/> : inputComponent;

    return (
        <div style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
            {labelComponent}
            {inputComponent}
        </div>
    );
};

export default Input;
