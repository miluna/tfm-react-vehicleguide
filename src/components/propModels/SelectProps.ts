import { CSSProperties, ReactElement, ChangeEvent } from "react";

export interface SelectProps extends ReactElement<any> {
    className?: string, 
    id: string, 
    options: Array<SelectOption>, 
    style?: CSSProperties, 
    onChange: any
}

export interface SelectOption extends ReactElement<any> {
    id?: string,
    text?: string
}
