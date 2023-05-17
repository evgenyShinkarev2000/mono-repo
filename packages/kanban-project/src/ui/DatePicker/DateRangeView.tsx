import { ReactNode } from "react";
import { Text } from "@kanban/ui/Text";
import * as S from "./DatePicker.styled";

type Props = {
    label: string;
    icon?: ReactNode;
    from: Date;
    to: Date;
};

export function DateRangeView(props: Props) {
    return (
        <div>
            <Text indent={1} type="body-5">
                {props.label}
            </Text>
            <S.Field style={{ cursor: "auto", userSelect: "all", width: 215 }}>
                {props.icon}
                <Text type="description-6">
                    {props.from.toLocaleDateString("ru")} - {props.to.toLocaleDateString("ru")}
                </Text>
            </S.Field>
        </div>
    );
}
