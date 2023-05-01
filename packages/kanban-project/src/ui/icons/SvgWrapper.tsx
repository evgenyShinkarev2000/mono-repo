import { CSSProperties, MouseEvent, ReactNode } from "react";
import { useHover } from "src/hooks/useHover";
import styled from "styled-components";

type Props = {
    children: ReactNode | ((isHovered: boolean) => ReactNode);
    style?: CSSProperties;
    onClick?: (e: MouseEvent) => void;
    viewBox?: number;
};

const Wrapper = styled.svg`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function SvgWrapper(props: Props) {
    const [hoverRef, isHovered] = useHover<SVGSVGElement>();
    const { viewBox = 24 } = props;

    return (
        <Wrapper
            onClick={(e) => {
                e.stopPropagation();
                if (props.onClick) props.onClick(e);
            }}
            ref={hoverRef}
            width={viewBox}
            height={viewBox}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={props.style}
        >
            {typeof props.children === "function" ? props.children(isHovered) : props.children}
        </Wrapper>
    );
}
