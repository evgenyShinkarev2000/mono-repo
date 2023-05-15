import { ReactNode } from "react";
import { Text } from "@kanban/ui/Text";
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
            <Text indent={1} type="body-5">
                {props.label}
            </Text>
            <S.Field style={{ cursor: "auto", width: "100%", userSelect: "all" }}>
                {props.icon}
                <p>
                    {props.from.toLocaleDateString("ru")} - {props.to.toLocaleDateString("ru")}
                </p>
            </S.Field>
        </div>
    );
}
