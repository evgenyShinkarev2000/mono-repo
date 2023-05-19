import { forwardRef, useRef, useState } from "react";
import { useOnClickOutside } from "@kanban/hooks/useOnClickOutside";
import { ITask } from "@kanban/types/ITask";
import * as S from "./TaskCreate.styled";
import { TextField } from "@kanban/ui/TextField";
import { Dropdown } from "@kanban/ui/Dropdown";
import { DropdownConverter } from "@kanban/utils/converters/DropdownConverter";

type Props = {
    onClose: () => void;
    onCreate: (task: ITask) => void;
};

type Project = "Канбан" | "Гант" | "Оценка";

export const TaskCreate = forwardRef<HTMLDivElement, Props>(function TaskView(props, ref) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(contentRef, props.onClose);

    const [title, setTitle] = useState("Название задачи");
    const [project, setProject] = useState<Project | null>(null);

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
                            placeholder="Проект"
                            data={["Канбан", "Гант", "Оценка"]}
                            onSelect={(item) => setProject(item)}
                            dataConverter={(item) => <DropdownConverter.Data.Header>{item}</DropdownConverter.Data.Header>}
                            idAccessor={(item) => item}
                            selectedConverter={(item) => (
                                <DropdownConverter.Selected.Header>{item}</DropdownConverter.Selected.Header>
                            )}
                            selectedId={project}
                        />
                    </div>
                </S.Body>
            </S.Content>
        </S.Wrapper>
    );
});
