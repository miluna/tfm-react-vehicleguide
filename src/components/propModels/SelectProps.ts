import { CSSProperties, ReactElement, ChangeEvent } from "react";

export interface SelectProps {
    className?: string, 
    id: string, 
    options: Array<SelectOption>, 
    style?: CSSProperties, 
    onChange: any,
    label?: string
}

export interface SelectOption {
    id?: string,
    text?: string
}
