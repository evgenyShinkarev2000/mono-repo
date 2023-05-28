import { TaskFull } from "@kanban/data/TaskFull";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { Button } from "@kanban/ui/Button";
import { DatePicker } from "@kanban/ui/DatePicker/DatePicker";
import { DateRange } from "@kanban/ui/DatePicker/DateRange";
import { DateRangeObject } from "@kanban/ui/DatePicker/types";
import { Dropdown } from "@kanban/ui/Dropdown";
import { Text } from "@kanban/ui/Text";
import { TextArea } from "@kanban/ui/TextArea";
import { TextField } from "@kanban/ui/TextField";
import { BookmarkIcon, CalendarIcon, ClockIcon, PlusInsideBoxIcon, PointsIcon } from "@kanban/ui/icons";
import { CloseItem } from "@kanban/ui/icons/CloseItem";
import { DropdownConverter } from "@kanban/utils/converters/DropdownConverter";
import { forwardRef, useRef, useState } from "react";
import * as S from "./TaskCreate.styled";
import { useAppSelector } from "../../../../shared/src/store/Hooks";
import { kanbanApi, kanbanApiContainer } from "@kanban/store/Api";
import { BaseStatuses } from "@kanban/data/Status";
import { useForm, Controller } from "react-hook-form";
import { nameof } from "@kanban/utils/converters/nameof";
import { Project } from "@kanban/data/Project";

type Props = {
    onClose: () => void;
    onCreate: (task: TaskFull) => void;
};

type Tag = "селфи" | "лето" | "отдых";

export const TaskCreate = forwardRef<HTMLDivElement, Props>(function TaskView(props, ref)
{
    const contentRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(contentRef, props.onClose);
    const projects = kanbanApiContainer.useGetProjectsQuery().data;


    const [taskModel, setTaskModel] = useState<Partial<TaskFull>>({
        author: useAppSelector(state => state.kanbanReducer.currentUser),
        checkList: [],
        deadline: new Date(),
        isOnKanban: true,
        title: "Новая задача",
        description: "",
        project: useAppSelector(state => state.kanbanReducer.projectFilter) ?? projects?.[0],
        plannedDates: {
            begin: new Date(),
            end: new Date(),
        },
        status: BaseStatuses.ToWork,
    });

    const { control, getValues } = useForm({ defaultValues: taskModel });
    console.log(getValues());

    const [tag, setTag] = useState<Tag | null>(null);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [plannedDeadline, setPlannedDeadline] = useState<DateRangeObject>({ from: new Date(), to: new Date() });
    const [description, setDescription] = useState("");
    const [checklist, setChecklist] = useState<string[]>(["таск 1", "таск 2"]);
    const [executors, setExecutors] = useState<string[]>([]);

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
                            Базовая задача: <span>Название задачи родителя</span>
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
                                    selectedId={ (field.value as Project).id }
                                    icon={<PointsIcon />}
                                />
                            }
                        />

                    </div>
                    <div>
                        <S.Inline>
                            <DatePicker label="Дедлайн" onChange={setDeadline} value={deadline} icon={<ClockIcon />} />
                            <div>
                                <Text indent={1} type="body-5">
                                    Тег команды
                                </Text>
                                <Dropdown<Tag, string>
                                    width={184}
                                    data={["селфи", "лето", "отдых"]}
                                    dataConverter={(item) => (
                                        <DropdownConverter.Data.CreateTask>{item}</DropdownConverter.Data.CreateTask>
                                    )}
                                    idAccessor={(item) => item}
                                    onSelect={setTag}
                                    selectedConverter={(item) => <Text type="description-6">{item}</Text>}
                                    selectedId={tag}
                                    placeholder="Тег команды"
                                    placeholderConverter={(item) => <Text type="description-6">{item}</Text>}
                                    icon={<BookmarkIcon />}
                                />
                            </div>
                            <DateRange
                                from={plannedDeadline.from}
                                to={plannedDeadline.to}
                                label="Планируемые сроки выполнения"
                                onChange={setPlannedDeadline}
                                icon={<CalendarIcon />}
                            />
                        </S.Inline>
                    </div>
                    <TextArea onChange={setDescription} value={description} placeholder="Описание" />
                    <S.Inline>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ display: "grid" }}>
                                <Text indent={1} type="body-5">
                                    Постановщик
                                </Text>

                                <Text type="description-7" style={{ display: "flex", justifySelf: "stretch" }}>
                                    Иван Иванович Иванов
                                </Text>
                            </div>
                            <div>
                                <Text indent={1} type="body-5">
                                    Ответственный
                                </Text>
                                <Dropdown
                                    data={["типо", "метод", "получения", "данных"]}
                                    dataConverter={(item) => (
                                        <DropdownConverter.Data.CreateTask>{item}</DropdownConverter.Data.CreateTask>
                                    )}
                                    selectedId={"Не выбран"}
                                    selectedConverter={(item) => (
                                        <DropdownConverter.Selected.CreateTask>{item}</DropdownConverter.Selected.CreateTask>
                                    )}
                                    idAccessor={(item) => item}
                                    onSelect={() => { }}
                                    placeholder="Не выбран"
                                    placeholderConverter={(item) => <Text type="description-4">{item}</Text>}
                                />
                            </div>
                        </div>
                    </S.Inline>
                    <div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8, flexDirection: "column" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                                <Text type="body-5">Исполнители</Text>
                                <PlusInsideBoxIcon
                                    onClick={() => setExecutors((prev) => [...prev, ""])}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                                {executors.map((x, i) => (
                                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <Dropdown
                                            data={["Иван", "Ксения", "Максим"]}
                                            dataConverter={(x) => (
                                                <DropdownConverter.Data.CreateTask>{x}</DropdownConverter.Data.CreateTask>
                                            )}
                                            selectedConverter={(x) => (
                                                <DropdownConverter.Selected.CreateTask>{x}</DropdownConverter.Selected.CreateTask>
                                            )}
                                            idAccessor={(x) => x}
                                            onSelect={(x) =>
                                            {
                                                const updated = [...executors];
                                                updated[i] = x;
                                                setExecutors(updated);
                                            }}
                                            placeholder="Исполнитель"
                                            placeholderConverter={(x) => <Text type="description-4">{x}</Text>}
                                            selectedId={x}
                                        />
                                        <CloseItem
                                            onClick={() =>
                                            {
                                                const updated = [...executors];
                                                updated.splice(i, 1);
                                                setExecutors(updated);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                            <Text type="body-5">Чек лист</Text>
                            <PlusInsideBoxIcon
                                onClick={() => setChecklist((prev) => [...prev, ""])}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                            {checklist.map((x, i) => (
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }} key={i}>
                                    <input
                                        style={{ padding: 5, width: 200 }}
                                        value={x}
                                        onChange={(e) =>
                                        {
                                            const text = e.target.value;
                                            const updated = [...checklist];
                                            updated.splice(i, 1, text);
                                            setChecklist(updated);
                                        }}
                                    />
                                    <CloseItem
                                        onClick={() =>
                                        {
                                            const updated = [...checklist];
                                            updated.splice(i, 1);
                                            setChecklist(updated);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <S.TaskButtons>
                            <Button onClick={() => { }} variant="primary" style={{ padding: "0 16px" }}>
                                Сохранить
                            </Button>

                            <Button onClick={props.onClose} variant="secondary" style={{ padding: "0 16px" }}>
                                Отмена
                            </Button>
                        </S.TaskButtons>
                    </div>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    );
});
