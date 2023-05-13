import { ReactNode } from "react";
import * as S from "./DatePicker.styled";

type Props = {
    icon?: ReactNode;
    value: Date;
    label: string;
};

export function DateView(props: Props) {
    return (
        <div>
            <S.Subtitle>{props.label}</S.Subtitle>
            <S.Field style={{ cursor: "auto", userSelect: "all" }}>
                {props.icon}
                <p>{props.value.toLocaleDateString("ru")}</p>
            </S.Field>
        </div>
    );
}
