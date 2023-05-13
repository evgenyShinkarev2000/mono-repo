import { useSyncStates } from "@kanban/hooks/useSyncStates";
import * as S from "./TextArea.styled";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function TextArea(props: Props) {
    const [text, setText] = useSyncStates(props.value);

    return <S.TextArea onChange={(e) => setText(e.target.value)} value={text}></S.TextArea>;
}
