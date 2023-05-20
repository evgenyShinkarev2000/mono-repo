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

    function renderModal() {
        if (!tasks) return;
        const selectedTask = tasks.find((t) => t.title === selectedId.current) as ITask;

        return (
            <>
                <CSSTransition timeout={300} in={stage === "view" && Boolean(selectedTask)} unmountOnExit mountOnEnter>
                    <TaskView
                        onEdit={() => setStage("edit")}
                        ref={taskViewRef}
                        task={selectedTask}
                        onClose={() => setStage(null)}
                    />
                </CSSTransition>
                <CSSTransition timeout={300} in={stage === "edit" && Boolean(selectedTask)} unmountOnExit mountOnEnter>
                    <TaskEdit
                        onChange={() => {}}
                        onSave={() => {}}
                        ref={taskViewRef}
                        task={selectedTask}
                        onClose={() => setStage(null)}
                    />
                </CSSTransition>
                <CSSTransition timeout={300} in={stage === "create"} unmountOnExit mountOnEnter>
                    <TaskCreate ref={taskViewRef} onClose={() => setStage(null)} onCreate={console.log} />
                </CSSTransition>
            </>
        );
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
// TODO: алерт при удалении завершенных
