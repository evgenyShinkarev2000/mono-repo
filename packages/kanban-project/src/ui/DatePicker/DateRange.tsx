import { ReactNode } from "react";
import * as S from "./DatePicker.styled";

type Props = {
    label: string;
    icon?: ReactNode;
    from: Date;
    to: Date;
};

export function DateRange(props: Props) {
    return (
        <div>
            <S.Subtitle>{props.label}</S.Subtitle>
            <S.Field style={{ cursor: "auto", width: "100%", userSelect: "all" }}>
                {props.icon}
                <p>
                    {props.from.toLocaleDateString("ru")} - {props.to.toLocaleDateString("ru")}
                </p>
            </S.Field>
        </div>
    );
}
