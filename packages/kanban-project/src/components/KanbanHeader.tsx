import { kanbanApiContainer } from "@kanban/store/Api";
import { setExecutorFilter, setProjectFilter } from "@kanban/store/KanbanSlice";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../shared/src/store/Hooks";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";

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
    onButtonClick: () => void;
};

export function KanbanHeader(props: Props)
{
    const dispatch = useAppDispatch();

    const executors = useMemo(() => ["Все задачи", "Мои задачи"], []);
    const [selectedExecutorIndex, setSelectedExecutorIndex] = useState(0);
    const handleSelectExecutor = (index: number) =>
    {
        setSelectedExecutorIndex(index);
        dispatch(setExecutorFilter(index == 0 ? "all" : "my"));
    }

    const projects = kanbanApiContainer.useGetProjectQuery().data;
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);
    const handleSelectProject = (index: number) =>
    {
        setSelectedProjectIndex(index);
        if (projects && index < projects.length)
        {
            dispatch(setProjectFilter(index >= 0 ? projects[index] : undefined));
        }
        else
        {
            throw new Error("unexpected select index");
        }
    }

    return (
        <StyledHeader>
            <Selects>
                <Select
                    placeholder="Фильтр по исполнителям"
                    items={executors}
                    selectedIndex={selectedExecutorIndex}
                    onSelect={(index) => handleSelectExecutor(index)}
                    titleSelector={i => i as string}
                />
                <Select
                    placeholder="Все проекты"
                    items={projects ?? []}
                    selectedIndex={selectedProjectIndex}
                    onSelect={(index) => handleSelectProject(index)}
                    titleSelector={project => project.name}
                    resetTitle="Все проекты"
                />
            </Selects>
            <Button variant="primary" onClick={props.onButtonClick}>Удалить завершенные задачи</Button>
        </StyledHeader>
    );
}
