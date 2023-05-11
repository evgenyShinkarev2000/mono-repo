import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { TaskView } from "./components/TaskView/TaskView";
import { mockTasks } from "./mock/mock";
import { ITask, ITaskStatus } from "./types/ITask";
import { TaskPosition } from "./types/ITaskPosition";
import { kanbanApiContainer } from "./store/Api";
import { TaskShort } from "./data/TaskShort";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

export const KanbanPage = () => {
    const {data} = kanbanApiContainer.useGetShortTasksQuery(null);
    const adaptedTask = data?.map(t => taskAdapter(t)) ?? [];
    // const [tasks, setTasks] = useState<ITask[]>(mockTasks);
    useEffect(() => {
        setTasks(adaptedTask);
    }, [data]);
    const [tasks, setTasks] = useState<ITask[]>(adaptedTask);
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        // fetch("localhost:3000/tasks")
        //     .then((r) => r.json())
        //     .then(setTasks);
    }, []);

    function removeCompletedTasks() {
        setTasks((prev) => prev.filter((task) => task.status !== "Завершенные"));
        // fetch("localhost:3000/removeCompletedTasks")
    }

    function onModalOpen(id: string) {
        setSelectedId(id);
    }

    const selectedTask = tasks.find((t) => t.title === selectedId);

    return (
        <>
            <Container>
                <KanbanHeader onButtonClick={removeCompletedTasks} />
                <Board tasks={tasks} onTasksChange={setTasks} onModalOpen={onModalOpen} />
            </Container>
            {selectedTask && createPortal(<TaskView task={selectedTask} onClose={() => setSelectedId("")} />, document.body)}
        </>
    );
};

function taskAdapter(taskShort: TaskShort): ITask{
    return {
        deadline: new Date(taskShort.deadline),
        executorName: taskShort.author.surname + " " + taskShort.author.name,
        project: taskShort.project.name,
        status: taskShort.status.name as unknown as ITaskStatus,
        tag: taskShort.tags?.length > 0 ? taskShort.tags[0].label : "",
        title: taskShort.title,
    }
}

// TODO: variant enum refactor
// TODO: fix Выполняются Выполняется
