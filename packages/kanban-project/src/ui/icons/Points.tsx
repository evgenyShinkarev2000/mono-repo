import { CSSProperties } from "react";
import { SvgWrapper } from "./SvgWrapper";

type Props = {
    style?: CSSProperties;
    onClick?: () => void;
};

export function PointsIcon(props: Props) {
    return (
        <SvgWrapper
            viewBox={16}
            onClick={(e) => {
                e.stopPropagation();
                if (props.onClick) props.onClick();
            }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6667 12.6666C14.6667 13.7712 13.7713 14.6666 12.6667 14.6666H3.33337C2.2288 14.6666 1.33337 13.7712 1.33337 12.6666V3.33325C1.33337 2.22868 2.2288 1.33325 3.33337 1.33325H12.6667C13.7713 1.33325 14.6667 2.22868 14.6667 3.33325V12.6666ZM7.33337 3.99992H11.3334C11.7016 3.99992 12 4.2984 12 4.66659C12 5.03478 11.7016 5.33325 11.3334 5.33325H7.33337C6.96518 5.33325 6.66671 5.03478 6.66671 4.66659C6.66671 4.2984 6.96518 3.99992 7.33337 3.99992ZM5.33337 4.66659C5.33232 4.57947 5.3142 4.4934 5.28004 4.41325C5.24628 4.33246 5.19893 4.25805 5.14004 4.19325C5.07524 4.13436 5.00083 4.08701 4.92004 4.05325C4.67178 3.94885 4.38508 4.00409 4.19337 4.19325C4.13449 4.25805 4.08714 4.33246 4.05337 4.41325C4.01921 4.4934 4.00109 4.57947 4.00004 4.66659C3.99902 4.84379 4.06858 5.01411 4.19337 5.13992C4.32113 5.26174 4.4902 5.3308 4.66671 5.33325C4.75416 5.33551 4.84092 5.31724 4.92004 5.27992C5.00083 5.24616 5.07524 5.19881 5.14004 5.13992C5.26186 5.01216 5.33092 4.8431 5.33337 4.66659ZM4.92004 7.38659C4.67178 7.28219 4.38508 7.33742 4.19337 7.52659C4.13164 7.58916 4.08392 7.66416 4.05337 7.74659C4.01921 7.82673 4.00109 7.9128 4.00004 7.99992C3.99902 8.17712 4.06858 8.34744 4.19337 8.47325C4.32113 8.59507 4.4902 8.66413 4.66671 8.66659C4.75383 8.66553 4.83989 8.64741 4.92004 8.61325C5.00083 8.57949 5.07524 8.53214 5.14004 8.47325L5.22004 8.37325C5.24527 8.33609 5.26545 8.29573 5.28004 8.25325C5.3039 8.21624 5.3219 8.17576 5.33337 8.13325C5.33665 8.08887 5.33665 8.0443 5.33337 7.99992C5.33092 7.82341 5.26186 7.65434 5.14004 7.52659C5.07524 7.4677 5.00083 7.42035 4.92004 7.38659ZM7.33337 7.33325H11.3334C11.7016 7.33325 12 7.63173 12 7.99992C12 8.36811 11.7016 8.66659 11.3334 8.66659H7.33337C6.96518 8.66659 6.66671 8.36811 6.66671 7.99992C6.66671 7.63173 6.96518 7.33325 7.33337 7.33325ZM5.14004 10.8599C5.07524 10.801 5.00083 10.7537 4.92004 10.7199C4.67178 10.6155 4.38508 10.6708 4.19337 10.8599C4.13268 10.9233 4.0851 10.9981 4.05337 11.0799C3.98206 11.2413 3.98206 11.4252 4.05337 11.5866C4.0851 11.6684 4.13268 11.7432 4.19337 11.8066C4.32113 11.9284 4.4902 11.9975 4.66671 11.9999C4.75383 11.9989 4.83989 11.9807 4.92004 11.9466C5.00083 11.9128 5.07524 11.8655 5.14004 11.8066C5.20073 11.7432 5.24831 11.6684 5.28004 11.5866C5.35136 11.4252 5.35136 11.2413 5.28004 11.0799C5.24831 10.9981 5.20073 10.9233 5.14004 10.8599ZM7.33337 10.6666H11.3334C11.7016 10.6666 12 10.9651 12 11.3333C12 11.7014 11.7016 11.9999 11.3334 11.9999H7.33337C6.96518 11.9999 6.66671 11.7014 6.66671 11.3333C6.66671 10.9651 6.96518 10.6666 7.33337 10.6666ZM12.6667 2.66659C13.0349 2.66659 13.3334 2.96506 13.3334 3.33325V12.6666C13.3334 13.0348 13.0349 13.3333 12.6667 13.3333H3.33337C2.96518 13.3333 2.66671 13.0348 2.66671 12.6666V3.33325C2.66671 2.96506 2.96518 2.66659 3.33337 2.66659H12.6667Z"
                fill="#231F20"
            />
        </SvgWrapper>
    );
}
