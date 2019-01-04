import { ReactNode } from "react";

export default interface ButtonProps {
    className? : string,
    type? : string,
    size? : string,
    text?: string,
    onClick?: any,
    children: ReactNode
}
