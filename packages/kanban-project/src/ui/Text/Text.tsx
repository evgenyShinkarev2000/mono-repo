import { CSSProperties } from "react";
import { PropsWithChildren } from "react";
import * as S from "./Text.styled";

export type TextType = "body-1" | "title-1";

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
