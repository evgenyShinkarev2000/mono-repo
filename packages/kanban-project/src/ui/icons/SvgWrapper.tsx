import { CSSProperties, MouseEvent, ReactNode } from "react";
import styled, { css } from "styled-components";
import { Colors } from "./IconProps";

type Props = {
    children: ReactNode;
    style?: CSSProperties;
    onClick?: (e: MouseEvent) => void;
    hoverColors?: Colors;
    viewBox?: string | number;
};

const Wrapper = styled.svg<{ colors?: Colors }>`
    transition: all 0.3s ease 0s;
    fill: currentColor;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ colors }) => {
        if (colors) {
            return css`
                &:hover {
                    color: ${colors.color} !important;
                    background-color: ${colors.backgroundColor} !important;
                    outline: 0 !important;
                }
                &:hover path{
                    fill: ${colors.color}
                }
            `;
        }
        return "";
    }}
`;

export function SvgWrapper(props: Props) {
    const viewBox = props.viewBox
        ? typeof props.viewBox === "number"
            ? `0 0 ${props.viewBox} ${props.viewBox}`
            : props.viewBox
        : "0 0 24 24";

    const width = viewBox.split(" ")[2];
    const height = viewBox.split(" ")[3];

    return (
        <Wrapper
            colors={props.hoverColors}
            onClick={(e) => {
                e.stopPropagation();
                if (props.onClick) props.onClick(e);
            }}
            width={width}
            height={height}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            style={props.style}
        >
            {props.children}
        </Wrapper>
    );
}
