import { Text } from "@kanban/ui/Text";
import { CheckMarkIcon } from "../icons";
import * as S from "./Checkbox.styled";

type Props = {
    label: string;
    value: string;
    checked?: boolean;
    onToggle?: (value: boolean) => void;
};

export function Checkbox(props: Props) {
    return (
        <div>
            <S.Label>
                <S.Input
                    hidden
                    type="checkbox"
                    checked={props.checked}
                    onChange={(e) => props.onToggle && props.onToggle(e.target.checked)}
                />
                <S.CustomCheckboxWrapper>
                    <S.CustomCheckbox>
                        <CheckMarkIcon />
                    </S.CustomCheckbox>
                </S.CustomCheckboxWrapper>
                <Text type="body-1">{props.label}</Text>
            </S.Label>
        </div>
    );
}
