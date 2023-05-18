import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { TaskShort } from "./data/TaskShort";
import { ITask, ITaskStatus } from "./types/ITask";
import { CSSTransition } from "react-transition-group";
import { TaskView } from "./components/TaskView/TaskView";
import { provider } from "./api/provider";
import { TaskLoader } from "./components/TaskLoader/TaskLoader";
import { TaskEdit } from "./components/TaskEdit/TaskEdit";
import { TaskCreate } from "./components/TaskCreate/TaskCreate";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

function useTasks() {
    const [tasks, setTasks] = useState<ITask[] | null>(null);

    useEffect(() => {
        // setTimeout(() => {
        fetch(provider.shortTasks)
            .then((r) => r.json())
            .then((data) => data.map(taskAdapter))
            .then(setTasks);
        // }, 5000);
    }, []);

    return [tasks, setTasks] as const;
}

function useStage() {}

export const KanbanPage = () => {
    const [tasks, setTasks] = useTasks();
    const selectedId = useRef("");
    const taskViewRef = useRef<HTMLDivElement | null>(null);

    const [stage, setStage] = useState<"edit" | "view" | "create" | null>(null);

    if (!tasks) {
        return <TaskLoader />;
    }

    function removeCompletedTasks() {
        setTasks((prev) => {
            if (!prev) return [];
            return prev.filter((task) => task.status !== "Завершенные");
        });
    }

    const selectedTask = tasks.find((t) => t.title === selectedId.current);

    function renderModal() {
        if (!selectedTask || !stage) return null;
        if (stage === "view") {
            return (
                <TaskView onEdit={() => setStage("edit")} ref={taskViewRef} task={selectedTask} onClose={() => setStage(null)} />
            );
        }

        if (stage === "edit") {
            return (
                <TaskEdit
                    onChange={() => {}}
                    onSave={() => {}}
                    ref={taskViewRef}
                    task={selectedTask}
                    onClose={() => setStage(null)}
                />
            );
        }

        if (stage === "create") {
            return <TaskCreate ref={taskViewRef} onClose={() => setStage(null)} onCreate={console.log} />;
        }

        return <mark>Error</mark>;
    }

    return (
        <>
            <Container>
                <KanbanHeader deleteCompletedTasks={removeCompletedTasks} createTask={() => setStage("create")} />
                {tasks ? (
                    <Board
                        tasks={tasks}
                        onTasksChange={setTasks}
                        onModalOpen={(id) => {
                            selectedId.current = id;
                            setStage("view");
                        }}
                    />
                ) : (
                    <TaskLoader />
                )}
                {renderModal()}
            </Container>
        </>
    );
};

function taskAdapter(taskShort: TaskShort): ITask {
    return {
        deadline: new Date(taskShort.deadline),
        executorName: taskShort.author.surname + " " + taskShort.author.name,
        project: taskShort.project.name,
        status: taskShort.status.name as unknown as ITaskStatus,
        tag: taskShort.tags?.length > 0 ? taskShort.tags[0].label : "",
        title: taskShort.title,
    };
}

// TODO: fix Выполняются Выполняется
// TODO: fix начальное открытие модального
