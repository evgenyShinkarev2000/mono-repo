import { forwardRef, useRef, useState } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ITask } from "@kanban/types/ITask";
import * as S from "./TaskCreate.styled";
import { TextField } from "@kanban/ui/TextField";
import { Dropdown } from "@kanban/ui/Dropdown";
import { DropdownConverter } from "@kanban/utils/converters/DropdownConverter";
import { Text } from "@kanban/ui/Text";
import { BookmarkIcon, CalendarIcon, ClockIcon, PlusInsideBoxIcon, PointsIcon } from "@kanban/ui/icons";
import { DatePicker } from "@kanban/ui/DatePicker/DatePicker";
import { DateRange } from "@kanban/ui/DatePicker/DateRange";
import { DateRangeObject } from "@kanban/ui/DatePicker/types";
import { TextView } from "@kanban/ui/TextArea/TextView";
import { CloseItem } from "@kanban/ui/icons/CloseItem";
import { CheckboxGroup } from "@kanban/ui/Checkbox/CheckboxGroup";
import { Checkbox } from "@kanban/ui/Checkbox";
import { Button } from "@kanban/ui/Button";
import { TextArea } from "@kanban/ui/TextArea";

type Props = {
    onClose: () => void;
    onCreate: (task: ITask) => void;
};

type Project = "Канбан" | "Гант" | "Оценка";
type Tag = "селфи" | "лето" | "отдых";

export const TaskCreate = forwardRef<HTMLDivElement, Props>(function TaskView(props, ref) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(contentRef, props.onClose);

    const [title, setTitle] = useState("Название задачи");
    const [project, setProject] = useState<Project | null>(null);
    const [tag, setTag] = useState<Tag | null>(null);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [plannedDeadline, setPlannedDeadline] = useState<DateRangeObject>({ from: new Date(), to: new Date() });
    const [description, setDescription] = useState("");
    const [checklist, setChecklist] = useState<string[]>(["таск 1", "таск 2"]);

    return (
        <S.Wrapper ref={ref}>
            <S.Content ref={contentRef}>
                <S.Body>
                    <div>
                        <TextField
                            onChange={setTitle}
                            value={title}
                            placeholder="Название задачи"
                            style={{ padding: 8, fontWeight: 500, fontSize: 20, lineHeight: "20px", marginBottom: 4 }}
                        />
                        <S.BaseTask>
                            Базовая задача: <span>Название задачи родителя</span>
                        </S.BaseTask>
                    </div>
                    <div>
                        <Dropdown<Project, string>
                            style={{ padding: "0 8px" }}
                            placeholder="Проект"
                            data={["Канбан", "Гант", "Оценка"]}
                            onSelect={(item) => setProject(item)}
                            dataConverter={(item) => (
                                <DropdownConverter.Data.CreateTask>{item}</DropdownConverter.Data.CreateTask>
                            )}
                            idAccessor={(item) => item}
                            selectedConverter={(item) => <Text type="description-6">{item}</Text>}
                            placeholderConverter={(item) => <Text type="description-6">{item}</Text>}
                            selectedId={project}
                            icon={<PointsIcon />}
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
                                    onSelect={() => {}}
                                    placeholder="Не выбран"
                                    placeholderConverter={(item) => <Text type="description-4">{item}</Text>}
                                />
                            </div>
                        </div>
                    </S.Inline>
                    <div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                            <Text type="body-5">Исполнители</Text>
                            <PlusInsideBoxIcon />
                        </div>
                        <div>
                            {["Иван Иванович Иванов", "шариков полиграф полиграфович"].map((v, i) => (
                                <S.Inline
                                    style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "flex-start" }}
                                    key={i}
                                >
                                    <Text type="description-7">{v}</Text>
                                    <CloseItem />
                                </S.Inline>
                            ))}
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
                                        onChange={(e) => {
                                            const text = e.target.value;
                                            const updated = [...checklist];
                                            updated.splice(i, 1, text);
                                            setChecklist(updated);
                                        }}
                                    />
                                    <CloseItem
                                        onClick={() => {
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
                            <Button onClick={() => {}} variant="primary" style={{ padding: "0 16px" }}>
                                Сохранить
                            </Button>

                            <Button onClick={() => {}} variant="secondary" style={{ padding: "0 16px" }}>
                                Отмена
                            </Button>
                        </S.TaskButtons>
                    </div>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    );
});
