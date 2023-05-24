import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { useAppSelector } from "../../shared/src/store/Hooks";
import { provider } from "./api/provider";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { TaskCreate } from "./components/TaskCreate/TaskCreate";
import { TaskEdit } from "./components/TaskEdit/TaskEdit";
import { TaskLoader } from "./components/TaskLoader/TaskLoader";
import { TaskView } from "./components/TaskView/TaskView";
import { TaskShort } from "./data/TaskShort";
import { kanbanApiContainer } from "./store/Api";
import { selectShortTasks } from "./store/TaskShortSelector";
import { ITask, ITaskStatus } from "./types/ITask";
import { BaseStatuses, Status } from "./data/Status";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

const useShortTasks = () =>
{
    kanbanApiContainer.useGetShortTasksSerializableQuery();

    return useAppSelector(selectShortTasks);
}


export const KanbanPage = () =>
{
    const tasks = useShortTasks().data!;
    const [removeTaskFromKanban] = kanbanApiContainer.useRemoveTaskFromKanbanMutation();
    const selectedId = useRef("");
    const taskViewRef = useRef<HTMLDivElement | null>(null);

    const [stage, setStage] = useState<"edit" | "view" | "create" | null>(null);

    if (!tasks)
    {
        return <TaskLoader />;
    }

    function removeCompletedTasks()
    {
        for(const task of tasks.filter(t => t.status.id == BaseStatuses.Compleated.id )){
            removeTaskFromKanban(task.id);
        }
    }

    function renderModal()
    {
        if (!tasks) return;
        const selectedTask = tasks.find((t) => t.title === selectedId.current) as TaskShort;

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
                        onChange={() => { }}
                        onSave={() => { }}
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
                        onModalOpen={(id) =>
                        {
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

function taskAdapter(taskShort: TaskShort): ITask
{
    return {
        deadline: new Date(taskShort.deadline),
        executorName: taskShort.author.surname + " " + taskShort.author.name,
        project: taskShort.project.name,
        status: taskShort.status?.name as unknown as ITaskStatus,
        tag: taskShort.tag,
        title: taskShort.title,
    };
}

// TODO: fix Выполняются Выполняется
// TODO: алерт при удалении завершенных
// TODO: dropdown arrow don't close dropdown
