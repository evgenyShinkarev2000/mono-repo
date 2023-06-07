import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { Stage } from "@kanban/data/Stage";
import { Tag } from "@kanban/data/Tag";
import { TaskFull } from "@kanban/data/TaskFull";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { kanbanApiContainer } from "@kanban/store/Api";
import { ITask } from "@kanban/types/ITask";
import { Button } from "@kanban/ui/Button";
import { CheckList } from "@kanban/ui/CheckList/CheckList";
import { DatePicker } from "@kanban/ui/DatePicker/DatePicker";
import { DateRange } from "@kanban/ui/DatePicker/DateRange";
import { Dropdown } from "@kanban/ui/Dropdown";
import { Text } from "@kanban/ui/Text";
import { TextArea } from "@kanban/ui/TextArea";
import { TextField } from "@kanban/ui/TextField";
import { BookmarkIcon, CalendarIcon, ClockIcon } from "@kanban/ui/icons";
import { PointsIcon } from "@kanban/ui/icons/Points";
import { DropdownConverter } from "@kanban/utils/converters/DropdownConverter";
import { nameof } from "@kanban/utils/converters/nameof";
import { forwardRef, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../../../shared/src/store/Hooks";
import { TaskViewComments } from "../TaskView/TaskViewComments";
import { Input } from "@kanban/ui/TextField/TextField.styled";
import * as S from "./TaskEdit.styled";
import { Commentary } from "@kanban/data/Commentary";

type Props = {
    onClose: () => void;
    onSave: (task: TaskFull) => void;
    task: TaskFull;
    onRemoveFromKanban: () => void;
    onRemove: () => void;
    onAddCommentary: (commentary: Commentary) => void;
};

export const TaskEdit = forwardRef<HTMLDivElement, Props>(function TaskView(props, ref)
{
    const contentRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(contentRef, props.onClose);
    const [comment, setComment] = useState("");

    const projects = kanbanApiContainer.useGetProjectsQuery().data;
    const tags = kanbanApiContainer.useGetTagsQuery().data;
    const users = kanbanApiContainer.useGetUsersQuery().data;

    const currentUser = useAppSelector(s => s.kanbanReducer.currentUser);


    const { control, getValues } = useForm({ defaultValues: props.task });

    const saveChanges = () =>
    {
        props.onSave(getValues());
        props.onClose();
    }

    const removeTask = () =>
    {
        props.onRemove();
        props.onClose();
    }

    const addCommentary = () =>
    {
        const commentary: Commentary = {
            author: currentUser,
            content: comment,
            task: {
                id: props.task.id
            }
        }
        props.onAddCommentary(commentary);
    }

    return (
        <S.Wrapper ref={ref}>
            <S.Content ref={contentRef}>
                <S.Body>
                    <div>
                        <Controller
                            name={nameof<TaskFull>("title")}
                            control={control}
                            render={
                                ({ field }) => <TextField
                                    onChange={field.onChange}
                                    value={field.value as string}
                                    placeholder="Название задачи"
                                    style={{ padding: 8, fontWeight: 500, fontSize: 20, lineHeight: "20px", marginBottom: 4 }}
                                />
                            }
                        />

                        <S.BaseTask>
                            Базовая задача:
                            {
                                props.task.parentTask
                                    ? <span>{props.task.parentTask?.title}</span>
                                    : <span>Нет</span>
                            }
                        </S.BaseTask>
                    </div>
                    <div>
                        <Controller
                            name={nameof<TaskFull>("project")}
                            control={control}
                            render={
                                ({ field }) => <Dropdown<Project, number>
                                    style={{ padding: "0 8px" }}
                                    placeholder="Проект"
                                    data={projects ?? []}
                                    onSelect={field.onChange}
                                    dataConverter={(item) => (
                                        <DropdownConverter.Data.CreateTask>{item.name}</DropdownConverter.Data.CreateTask>
                                    )}
                                    idAccessor={(item) => item.id}
                                    selectedConverter={(item) => <Text type="description-6">{item.name}</Text>}
                                    placeholderConverter={(item) => <Text type="description-6">{item}</Text>}
                                    selectedId={(field.value as Project).id}
                                    icon={<PointsIcon />}
                                />
                            }
                        />

                    </div>
                    <div>
                        <S.Inline>
                            <Controller
                                name={nameof<TaskFull>("deadline")}
                                control={control}
                                render={
                                    ({ field }) => <DatePicker label="Дедлайн" onChange={field.onChange} value={field.value as Date} icon={<ClockIcon />} />
                                }
                            />

                            <div>
                                <Text indent={1} type="body-5">
                                    Тег команды
                                </Text>
                                <Controller
                                    name={nameof<TaskFull>("tag")}
                                    control={control}
                                    render={
                                        ({ field }) => <Dropdown<Tag, number>
                                            width={184}
                                            data={tags ?? []}
                                            dataConverter={(item) => (
                                                <DropdownConverter.Data.CreateTask>{item.tag}</DropdownConverter.Data.CreateTask>
                                            )}
                                            idAccessor={(item) => item.id}
                                            onSelect={field.onChange}
                                            selectedConverter={(item) => <Text type="description-6">{item.tag}</Text>}
                                            selectedId={(field?.value as Tag)?.id}
                                            placeholder="Тег команды"
                                            placeholderConverter={(item) => <Text type="description-6">{item}</Text>}
                                            icon={<BookmarkIcon />}
                                        />
                                    }
                                />

                            </div>
                            <Controller
                                name={nameof<TaskFull>("plannedDates")}
                                control={control}
                                render={
                                    ({ field }) => <DateRange
                                        from={(field.value as TaskFull["plannedDates"]).begin}
                                        to={(field.value as TaskFull["plannedDates"]).end}
                                        label="Планируемые сроки выполнения"
                                        onChange={
                                            (range) => field.onChange({
                                                begin: range.from,
                                                end: range.to
                                            } as TaskFull["plannedDates"])
                                        }
                                        icon={<CalendarIcon />}
                                    />
                                }
                            />

                        </S.Inline>
                    </div>
                    <Controller
                        name={nameof<TaskFull>("description")}
                        control={control}
                        render={
                            ({ field }) => <TextArea onChange={field.onChange} value={field.value as string ?? ""} placeholder="Описание" />
                        }
                    />

                    <S.Inline>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ display: "grid" }}>
                                <Text indent={1} type="body-5">
                                    Постановщик
                                </Text>

                                <Text type="description-7" style={{ display: "flex", justifySelf: "stretch" }}>
                                    {`${currentUser.name} ${currentUser.surname}`}
                                </Text>
                            </div>
                            <div>
                                <Text indent={1} type="body-5">
                                    Ответственный
                                </Text>
                                <Controller
                                    name={nameof<TaskFull>("responsible")}
                                    control={control}
                                    render={
                                        ({ field }) => <Dropdown<Person, number>
                                            data={users ?? []}
                                            dataConverter={(item) => (
                                                <DropdownConverter.Data.CreateTask>{`${item.name} ${item.surname}`}</DropdownConverter.Data.CreateTask>
                                            )}
                                            selectedId={(field.value as Person).id}
                                            selectedConverter={(item) => (
                                                <DropdownConverter.Selected.CreateTask>{`${item.name} ${item.surname}`}</DropdownConverter.Selected.CreateTask>
                                            )}
                                            idAccessor={(item) => item.id}
                                            onSelect={field.onChange}
                                            placeholder="Не выбран"
                                            placeholderConverter={(item) => <Text type="description-4">{item}</Text>}
                                        />
                                    }
                                />

                            </div>
                        </div>
                    </S.Inline>
                    <Controller
                        name={nameof<TaskFull>("checkList")}
                        control={control}
                        render={
                            ({ field }) => <CheckList value={field.value as Stage[]} onChange={field.onChange} mode="edit" />
                        }
                    />
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Controller name={nameof<TaskFull>("wastedTime")} control={control} render={
                            ({ field }) => <Input type="time" value={field.value as string} onChange={field.onChange} style={{ width: "min-content" }} />
                        } />

                        <Text type="description-7">{
                            `${props.task.author.name} ${props.task.author.surname}`
                        }
                        </Text>
                    </div>
                    <div style={{ marginBottom: 48 }}>
                        <S.TaskButtons>
                            <Button onClick={saveChanges} variant="primary" style={{ padding: "0 16px" }}>
                                Сохранить
                            </Button>
                            <Button onClick={removeTask} variant="danger" style={{ padding: "0 16px" }}>
                                Удалить задачу
                            </Button>
                            <Button onClick={props.onRemoveFromKanban} variant="secondary" style={{ padding: "0 16px" }}>
                                Убрать с канбан доски
                            </Button>
                        </S.TaskButtons>
                    </div>
                    <S.Comments>
                        <TextField
                            onChange={setComment}
                            value={comment}
                            label="Комментарии"
                            placeholder="Введите комментарий..."
                            onKeyDown={(e) => e.key === "Enter" && addCommentary()}
                        />
                        <CSSTransition timeout={300} in={Boolean(comment)} unmountOnExit>
                            <S.AnimatedButton>
                                <Button variant="primary" onClick={addCommentary}>
                                    Отправить
                                </Button>
                            </S.AnimatedButton>
                        </CSSTransition>
                        <TaskViewComments comments={props.task.comments} />
                    </S.Comments>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    );
});
