import { kanbanApiContainer } from "@kanban/store/Api";
import { setExecutorFilter, setProjectFilter } from "@kanban/store/KanbanSlice";
import { DropdownConverter } from "@kanban/utils/converters/DropdownConverter";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../shared/src/store/Hooks";
import { Button } from "../ui/Button";
import { Dropdown } from "../ui/Dropdown";

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
`;
const Selects = styled.div`
    display: flex;
    gap: 16px;
`;

type Props = {
    createTask: () => void;
    deleteCompletedTasks: () => void;
};

type Project = "Канбан" | "Гант" | "Оценка";
type Filter = "Все задачи" | "Мои задачи";

export function KanbanHeader(props: Props) {
    const dispatch = useAppDispatch();

    const [selectedExecutorIndex, setSelectedExecutorIndex] = useState(0);
    const handleSelectExecutor = (index: number) => {
        setSelectedExecutorIndex(index);
        dispatch(setExecutorFilter(index == 0 ? "all" : "my"));
    };

    const projects = kanbanApiContainer.useGetProjectQuery().data;
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
    const handleSelectProject = (index: number) => {
        setSelectedProjectIndex(index);
        if (projects && index < projects.length) {
            dispatch(setProjectFilter(index >= 0 ? projects[index] : undefined));
        } else {
            throw new Error("unexpected select index");
        }
    };

    const [project, setProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState<Filter | null>(null);

    return (
        <StyledHeader>
            <Selects>
                <Dropdown<Filter, string>
                    placeholder="Фильтр по исполнителям"
                    data={["Все задачи", "Мои задачи"]}
                    onSelect={(item) => setFilter(item)}
                    dataConverter={(item) => <DropdownConverter.Data.Header>{item}</DropdownConverter.Data.Header>}
                    idAccessor={(item) => item}
                    selectedConverter={(item) => <DropdownConverter.Selected.Header>{item}</DropdownConverter.Selected.Header>}
                    selectedId={filter}
                />
                <Dropdown<Project, string>
                    placeholder="Все проекты"
                    data={["Гант", "Канбан", "Оценка"]}
                    onSelect={(item) => setProject(item)}
                    dataConverter={(item) => <DropdownConverter.Data.Header>{item}</DropdownConverter.Data.Header>}
                    idAccessor={(item) => item}
                    selectedConverter={(item) => <DropdownConverter.Selected.Header>{item}</DropdownConverter.Selected.Header>}
                    selectedId={project}
                />
            </Selects>
            <div style={{ display: "flex", gap: 8 }}>
                <Button variant="primary" onClick={props.createTask}>
                    Создать задачу
                </Button>
                <Button variant="primary" onClick={props.deleteCompletedTasks}>
                    Удалить завершенные задачи
                </Button>
            </div>
        </StyledHeader>
    );
}
