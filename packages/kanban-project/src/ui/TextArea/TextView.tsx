import { Text } from "../Text/Text";
import * as S from "./TextArea.styled";

type Props = {
    value: string;
};

export function TextView(props: Props) {
    return (
        <S.TextView>
            <Text type="description-5">{props.value}</Text>
        </S.TextView>
    );
}
