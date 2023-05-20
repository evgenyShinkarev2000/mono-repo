import { forwardRef, useRef, useState } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ITask } from "@kanban/types/ITask";
import * as S from "./TaskCreate.styled";
import { TextField } from "@kanban/ui/TextField";
import { Dropdown } from "@kanban/ui/Dropdown";
import { DropdownConverter } from "@kanban/utils/converters/DropdownConverter";
import { Text } from "@kanban/ui/Text";
import { BookmarkIcon, CalendarIcon, ClockIcon, PointsIcon } from "@kanban/ui/icons";
import { DatePicker } from "@kanban/ui/DatePicker/DatePicker";
import { DateRange } from "@kanban/ui/DatePicker/DateRange";
import { DateRangeObject } from "@kanban/ui/DatePicker/types";

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
                </S.Body>
            </S.Content>
        </S.Wrapper>
    );
});
