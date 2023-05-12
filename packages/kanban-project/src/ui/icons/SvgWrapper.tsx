import { CSSProperties, MouseEvent, ReactNode } from "react";
import { useHover } from "@kanban/hooks/useHover";
import styled from "styled-components";

type Props = {
    children: ReactNode | ((isHovered: boolean) => ReactNode);
    style?: CSSProperties;
    onClick?: (e: MouseEvent) => void;
    viewBox?: string | number;
};

const Wrapper = styled.svg`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function SvgWrapper(props: Props) {
    const [hoverRef, isHovered] = useHover<SVGSVGElement>();
    const viewBox = props.viewBox
        ? typeof props.viewBox === "number"
            ? `0 0 ${props.viewBox} ${props.viewBox}`
            : props.viewBox
        : "0 0 24 24";

    const width = viewBox.split(" ")[2];
    const height = viewBox.split(" ")[3];

    return (
        <Wrapper
            onClick={(e) => {
                e.stopPropagation();
                if (props.onClick) props.onClick(e);
            }}
            ref={hoverRef}
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={props.style}
        >
            {typeof props.children === "function" ? props.children(isHovered) : props.children}
        </Wrapper>
    );
}
