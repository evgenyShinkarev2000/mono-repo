import { useSyncStates } from "@kanban/hooks/useSyncStates";
import { Text } from "@kanban/ui/Text";
import { KeyboardEventHandler } from "react";
import * as S from "./TextField.styled";

type Props = {
    value: string;
    label?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export function TextField(props: Props) {
    const [value, setValue] = useSyncStates(props.value);
    return (
        <div>
            {props.label && (
                <Text indent={2} type="body-5">
                    {props.label}
                </Text>
            )}
            <S.Input
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    props.onChange(e.target.value);
                }}
                placeholder={props.placeholder}
                onKeyDown={props.onKeyDown}
            />
        </div>
    );
}
