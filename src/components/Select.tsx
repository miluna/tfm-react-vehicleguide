import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { SelectProps } from './propModels/SelectProps';

const Select : FunctionComponent<SelectProps> = ({className, id, options, onChange, label} : SelectProps) : ReactElement<SelectProps> => {
    const classes = className ? `select is-fullwidth ${className}` : "select is-fullwidth";

    const labelComponent = label ? <label>{label}</label> : null;

    let content = options.map(e => e.id !== null ?
        <option key={e.id + "_" + e.text} id={e.id}>{e.text}</option> :
        <option key={e.text}>{e.text}</option>     
    );


    return (
        <div className={classes} style={{marginTop: '1rem', marginBottom: '1rem', width: '85%'}}>
            {labelComponent}
            <select id={id} onChange={onChange}>
                {content}
            </select>
        </div>
    );
};

export default Select;
