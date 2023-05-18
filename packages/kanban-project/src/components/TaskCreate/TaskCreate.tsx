import { forwardRef, useRef, useState } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { TimerIcon } from "@kanban/ui/icons/Timer";
import { ITask } from "@kanban/types/ITask";
import { PointsIcon } from "@kanban/ui/icons/Points";
import * as S from "./TaskCreate.styled";
import { DateView } from "@kanban/ui/DatePicker/DateView";
import { BookmarkIcon, CalendarIcon, ClockIcon, PlayIcon, PlusInsideBoxIcon, TrashIcon } from "@kanban/ui/icons";
import { Text } from "@kanban/ui/Text";
import { CheckboxGroup } from "@kanban/ui/Checkbox/CheckboxGroup";
import { Checkbox } from "@kanban/ui/Checkbox";
import { Button } from "@kanban/ui/Button";
import { TextField } from "@kanban/ui/TextField";
import { mockComments } from "@kanban/mock/MockComments";
import { CSSTransition } from "react-transition-group";
import { DateRangeView } from "@kanban/ui/DatePicker/DateRangeView";
import { TextView } from "@kanban/ui/TextArea/TextView";
import { TaskViewComments } from "../TaskView/TaskViewComments";

type Props = {
    onClose: () => void;
    onCreate: (task: ITask) => void;
};

export const TaskCreate = forwardRef<HTMLDivElement, Props>(function TaskView(props, ref) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(contentRef, props.onClose);

    const [comment, setComment] = useState("");

    return (
        <S.Wrapper ref={ref}>
            <S.Content ref={contentRef}>
                <S.Body>
                    <h1>Create from</h1>
                </S.Body>
                <S.Comments>
                    <TextField
                        onChange={setComment}
                        value={comment}
                        label="Комментарии"
                        placeholder="Введите комментарий..."
                        onKeyDown={(e) => e.key === "Enter" && setComment("")}
                    />
                    <CSSTransition timeout={300} in={Boolean(comment)} unmountOnExit>
                        <S.AnimatedButton>
                            <Button variant="primary" onClick={() => setComment("")}>
                                Отправить
                            </Button>
                        </S.AnimatedButton>
                    </CSSTransition>
                    <TaskViewComments comments={mockComments} />
                </S.Comments>
            </S.Content>
        </S.Wrapper>
    );
});
