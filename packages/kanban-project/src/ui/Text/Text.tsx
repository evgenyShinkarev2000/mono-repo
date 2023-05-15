import { CSSProperties } from "react";
import { PropsWithChildren } from "react";
import * as S from "./Text.styled";

export type TextType =
    | "title-1"
    | "body-1"
    | "body-2"
    | "body-3"
    | "body-4"
    | "body-5"
    | "body-6"
    | "body-7"
    | "body-8"
    | "body-9"
    | "description-1"
    | "description-2"
    | "description-3"
    | "description-4"
    | "description-5"
    | "description-6"
    | "description-7"
    | "description-8";

type Props = {
    type?: TextType;
    style?: CSSProperties;
    indent?: number;
};

export function Text(props: PropsWithChildren<Props>) {
    const { type = "body-1", indent = 0 } = props;

    return (
        <S.Text type={type} style={{ marginBottom: 4 * indent, ...props.style }}>
            {props.children}
        </S.Text>
    );
}
