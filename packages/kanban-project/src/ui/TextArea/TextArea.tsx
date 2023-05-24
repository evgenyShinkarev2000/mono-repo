import { useSyncStates } from "@kanban/hooks/useSyncStates";
import * as S from "./TextArea.styled";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function TextArea(props: Props) {
    const [text, setText] = useSyncStates(props.value);

    return <S.TextArea placeholder={props.placeholder} onChange={(e) => setText(e.target.value)} value={text}></S.TextArea>;
}
