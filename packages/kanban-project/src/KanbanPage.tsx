import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { mockTasks } from "./mock/mock";
import { ITask } from "./types/ITask";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

export const KanbanPage = () => {
    const [tasks, setTasks] = useState<ITask[]>(mockTasks);

    useEffect(() => {
        // fetch("localhost:3000/tasks")
        //     .then((r) => r.json())
        //     .then(setTasks);
    }, []);

    function removeCompletedTasks() {
        setTasks((prev) => prev.filter((task) => task.status !== "Завершенные"));
        // fetch("localhost:3000/removeCompletedTasks")
    }

    return (
        <Container>
            <KanbanHeader onButtonClick={removeCompletedTasks} />
            <Board tasks={tasks} />
        </Container>
    );
};

// TODO: variant enum refactor
// TODO: always show cols
