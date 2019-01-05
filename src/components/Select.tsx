import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { SelectProps } from './propModels/SelectProps';

const Select : FunctionComponent<SelectProps> = ({className, id, options, style, onChange} : SelectProps) : ReactElement<SelectProps> => {
    const classes = className ? `select ${className}` : "select";
    let content = options.map(e => e.id !== null ? 
        <option key={e.id + "_" + e.text} id={e.id}>{e.text}</option> :
        <option key={e.text}>{e.text}</option>     
    );


    return (
        <div className={classes} style={style}>
            <select id={id} onChange={onChange}>
                {content}
            </select>
        </div>
    );
};

export default Select;
