import { Commentary } from "@kanban/data/Commentary";
import { TaskFull } from "@kanban/data/TaskFull";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { Button } from "@kanban/ui/Button";
import { CheckList } from "@kanban/ui/CheckList/CheckList";
import { DateRangeView } from "@kanban/ui/DatePicker/DateRangeView";
import { DateView } from "@kanban/ui/DatePicker/DateView";
import { Text } from "@kanban/ui/Text";
import { TextView } from "@kanban/ui/TextArea/TextView";
import { TextField } from "@kanban/ui/TextField";
import { BookmarkIcon, CalendarIcon, ClockIcon, PlayIcon, TrashIcon } from "@kanban/ui/icons";
import { PointsIcon } from "@kanban/ui/icons/Points";
import { TimerIcon } from "@kanban/ui/icons/Timer";
import { forwardRef, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../../../shared/src/store/Hooks";
import * as S from "./TaskView.styled";
import { TaskViewComments } from "./TaskViewComments";

type Props = {
    onClose: () => void;
    onEdit: () => void;
    onAddCommentary: (commentary: Commentary) => void,
    onRemove: () => void,
    onRemoveFromKanban: () => void,
    task: TaskFull;
};

export const TaskView = forwardRef<HTMLDivElement, Props>(function TaskView(props, ref)
{
    const contentRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(contentRef, props.onClose);
    const currentUser = useAppSelector(s => s.kanbanReducer.currentUser);
    const removeTask = () => {
        props.onRemove();
        props.onClose();
    }

    const onAddCommentary = () => {
        const commentary: Commentary = {
            content: comment,
            author: currentUser,
            task: props.task,
        }
        props.onAddCommentary(commentary);
    }

    const [comment, setComment] = useState("");

    return (
        <S.Wrapper ref={ref}>
            <S.Content ref={contentRef}>
                <S.Body>
                    <div>
                        <Text type="body-8" indent={1} style={{ padding: "8px 0" }}>
                            {props.task.title}
                        </Text>
                        <S.BaseTask>
                            Базовая задача:
                            {
                                props.task.parentTask
                                    ? <span>{props.task.parentTask?.title}</span>
                                    : <span>Нет</span>
                            }
                        </S.BaseTask>
                        <S.Status>Статус “{props.task.status.name}”</S.Status>
                    </div>
                    <div>
                        <Text indent={1} type="body-5">
                            Проект
                        </Text>
                        <S.Field width={184}>
                            <PointsIcon />
                            <Text type="description-6">{props.task.project.name}</Text>
                        </S.Field>
                    </div>
                    <S.Inline>
                        <DateView label="Дедлайн" value={props.task.deadline} icon={<TimerIcon />} />
                        <div>
                            <Text indent={1} type="body-5">
                                Тег команды
                            </Text>
                            <S.Field width={184}>
                                <BookmarkIcon />
                                <Text type="description-6">{props.task.tag.tag}</Text>
                            </S.Field>
                        </div>
                        <DateRangeView
                            label="Планируемые сроки выполнения"
                            from={props.task.plannedDates.begin}
                            to={props.task.plannedDates.end}
                            icon={<CalendarIcon />}
                        />
                    </S.Inline>
                    <TextView value={props.task.description} />
                    <div style={{ display: "flex", gap: 8 }}>
                        <div>
                            <Text indent={1} type="body-5">
                                Постановщик
                            </Text>
                            <Text type="description-7">{`${props.task.author.name} ${props.task.author.surname}`}</Text>
                        </div>
                        <div>
                            <Text indent={1} type="body-5">
                                Ответственный
                            </Text>
                            <S.Field>
                                <Text type="description-7">{`${props.task.author.name} ${props.task.author.surname}`}</Text>
                            </S.Field>
                        </div>
                    </div>
                    {/* <div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                            <Text type="body-5">Исполнители</Text>
                        </div>
                        <div>
                            <Text type="description-7">{`${props.task.author.name} ${props.task.author.surname}`}</Text>
                        </div>
                    </div> */}
                    <div>
                        <CheckList value={props.task.checkList} mode="readonly" onChange={() => { }} />
                    </div>
                    <div>
                        <Text indent={2} type="body-5">
                            Таймер
                        </Text>
                        <S.TimerWrapper>
                            <S.Field width={118}>
                                <ClockIcon />
                                <Text type="body-1">100:60:60</Text>
                            </S.Field>
                            <S.TaskButtons>
                                <Button onClick={() => { }} variant="primary" style={{ padding: 8 }}>
                                    <PlayIcon />
                                </Button>
                                <Button onClick={() => { }} variant="primary" style={{ padding: "0 16px" }}>
                                    Сохранить
                                </Button>
                                <Button onClick={() => { }} variant="secondary" style={{ padding: 8 }}>
                                    <TrashIcon />
                                </Button>
                            </S.TaskButtons>
                        </S.TimerWrapper>
                    </div>
                    <div>
                        <Text indent={2} type="body-5">
                            Затраченное время
                        </Text>
                        <Text type="description-7">{
                            `${props.task.wastedTime.toString()} `
                            + `${props.task.author.name} ${props.task.author.surname}`
                        }
                        </Text>
                    </div>
                    <div style={{ marginBottom: 48 }}>
                        <S.TaskButtons>
                            <Button onClick={props.onEdit} variant="primary" style={{ padding: "0 16px" }}>
                                Редактировать
                            </Button>
                            <Button onClick={removeTask} variant="danger" style={{ padding: "0 16px" }}>
                                Удалить задачу
                            </Button>
                            <Button onClick={props.onRemoveFromKanban} variant="secondary" style={{ padding: "0 16px" }}>
                                Убрать с канбан доски
                            </Button>
                        </S.TaskButtons>
                    </div>
                </S.Body>
                <S.Comments>
                    <TextField
                        onChange={setComment}
                        value={comment}
                        label="Комментарии"
                        placeholder="Введите комментарий..."
                        onKeyDown={(e) => e.key === "Enter" && onAddCommentary()}
                    />
                    <CSSTransition timeout={300} in={Boolean(comment)} unmountOnExit>
                        <S.AnimatedButton>
                            <Button variant="primary" onClick={onAddCommentary}>
                                Отправить
                            </Button>
                        </S.AnimatedButton>
                    </CSSTransition>
                    <TaskViewComments comments={props.task.comments} />
                </S.Comments>
            </S.Content>
        </S.Wrapper>
    );
});
