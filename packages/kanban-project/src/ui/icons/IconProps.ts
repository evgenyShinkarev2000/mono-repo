import { CSSProperties } from "react";

export type IconProps = {
    style?: CSSProperties;
    onClick?: () => void;
    hoverColors?: Colors;
};

export type Colors = {
    color: CSSProperties["color"];
    backgroundColor: CSSProperties["color"];
};
