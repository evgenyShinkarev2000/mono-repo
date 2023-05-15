import * as S from "./TaskView.styled";
import { Text } from "@kanban/ui/Text";

type TaskViewComment = {
    name: string;
    time: Date;
    text: string;
};

type Props = {
    comments: TaskViewComment[];
};

export function TaskViewComments(props: Props) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {props.comments.map((comment) => (
                <div key={comment.time.getMilliseconds()}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Text type="description-5">{comment.name}</Text>
                        <Text type="description-1">
                            {comment.time.getHours().toString().padStart(2, "0")}:
                            {comment.time.getMinutes().toString().padStart(2, "0")}
                        </Text>
                    </div>
                    <S.Field style={{ padding: "8px 16px" }}>
                        <Text type="description-5">{comment.text}</Text>
                    </S.Field>
                </div>
            ))}
        </div>
    );
}
