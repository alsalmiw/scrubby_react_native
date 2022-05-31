import { ReactNode } from "react";
export default interface IButtonStandard {
    onPress: Function;
    children: ReactNode,
    color: string,
    radius: number,

}