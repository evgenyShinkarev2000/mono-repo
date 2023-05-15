import React, { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import { kanbanApi, kanbanApiContainer } from "@kanban/store/Api";
import { kanbanActionContainer, setProjectFilter } from "@kanban/store/KanbanSlice";
import { useAppDispatch } from "../../../shared/src/store/Hooks";
import { useDispatch } from "react-redux";
import { store } from "../../../shared/src/store";

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
                    onSelect={(index) => setSelectedExecutorIndex(index)}
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
