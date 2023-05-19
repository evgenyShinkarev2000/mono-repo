import { useSyncStates } from "@kanban/hooks/useSyncStates";
import { Text } from "@kanban/ui/Text";
import { CSSProperties, KeyboardEventHandler } from "react";
import { TextType } from "../Text/Text";
import * as S from "./TextField.styled";

type Props = {
    value: string;
    label?: string;
    placeholder?: string;
    style?: CSSProperties;
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
                style={props.style}
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
