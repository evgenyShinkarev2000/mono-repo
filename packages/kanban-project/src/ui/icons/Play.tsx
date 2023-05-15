import { CSSProperties } from "react";
import { SvgWrapper } from "./SvgWrapper";

type Props = {
    style?: CSSProperties;
    onClick?: () => void;
    hover?: boolean;
};

export function PlayIcon(props: Props) {
    const { hover = false } = props;

    return (
        <SvgWrapper
            style={props.style}
            onClick={(e) => {
                e.stopPropagation();
                if (props.onClick) props.onClick();
            }}
        >
            {(isHovered) => {
                const fillColor = !hover || !isHovered ? "#fff" : "#989898";
                return (
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.84672 5.28532L16.6707 9.63866C17.83 10.2853 18 11.1653 18 11.6187C18 12.072 17.83 12.8987 16.6707 13.5653L8.84672 17.9053C8.51685 18.0956 8.15098 18.1983 7.77844 18.2053C7.4622 18.2103 7.151 18.1179 6.88011 17.9387C6.2856 17.4902 5.95277 16.7286 6.00605 15.9387V7.28532C5.95022 6.49483 6.28363 5.73192 6.88011 5.28532C7.48989 4.90489 8.23694 4.90489 8.84672 5.28532ZM8.30042 16.6986L16.1183 12.3453C16.5311 12.1119 16.786 11.8186 16.786 11.5853C16.786 11.3519 16.5311 11.0586 16.1183 10.8319L8.27614 6.4786C8.11583 6.38142 7.9371 6.32664 7.75414 6.3186C7.66901 6.32119 7.58571 6.34635 7.51135 6.39194C7.29259 6.60092 7.18329 6.91607 7.21999 7.23194V15.9386C7.18329 16.2545 7.29259 16.5696 7.51135 16.7786C7.76995 16.8989 8.06624 16.8689 8.30042 16.6986Z"
                        fill={fillColor}
                    />
                );
            }}
        </SvgWrapper>
    );
}
