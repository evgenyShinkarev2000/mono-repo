import * as S from "./TextArea.styled";

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function TextArea(props: Props) {
    return <S.TextArea placeholder={props.placeholder} onChange={(e) => props.onChange(e.currentTarget.value)} value={props.value}></S.TextArea>;
}
