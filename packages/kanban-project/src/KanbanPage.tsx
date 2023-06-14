import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { useAppSelector } from "../../shared/src/store/Hooks";
import { Board } from "./components/Board";
import { KanbanHeader } from "./components/KanbanHeader";
import { TaskCreate } from "./components/TaskCreate/TaskCreate";
import { TaskEdit } from "./components/TaskEdit/TaskEdit";
import { TaskLoader } from "./components/TaskLoader/TaskLoader";
import { TaskView } from "./components/TaskView/TaskView";
import { Commentary } from "./data/Commentary";
import { BaseStatuses } from "./data/Status";
import { TaskFull } from "./data/TaskFull";
import { TaskShort } from "./data/TaskShort";
import { kanbanApiContainer } from "./store/Api";
import { selectFilteredShortTasks } from "./store/FilteredTaskSelector";
import { useFullTask } from "./store/useFullTask";

const Container = styled.div`
    padding-top: 32px;
    max-width: 1664px;
    margin: 0 auto;
`;

const useFilteredShortTasks = () => {
    kanbanApiContainer.useGetShortTasksSerializableQuery();

    return useAppSelector(selectFilteredShortTasks);
}

export const KanbanPage = () =>
{
    const tasks = useFilteredShortTasks().data!;
    const [removeTaskFromKanban] = kanbanApiContainer.useRemoveTaskFromKanbanMutation();
    const [putTask] = kanbanApiContainer.usePutFullTaskMutation();
    const [addTask] = kanbanApiContainer.useAddFullTaskMutation();
    const [addCommentary] = kanbanApiContainer.useAddCommentaryMutation();
    const [eraseTask] = kanbanApiContainer.useRemoveTaskMutation();
    const [patchStatus] = kanbanApiContainer.usePatchTaskStatusMutation();
    const [getFullTask, fullTaskResponse] = useFullTask();
    const taskViewRef = useRef<HTMLDivElement | null>(null);

    const [stage, setStage] = useState<"edit" | "view" | "create" | null>(null);

    if (!tasks)
    {
        return <TaskLoader />;
    }

    const handleStatusChange = (task: TaskShort, statusId: number) =>
    {
        patchStatus({ taskId: task.id!, newStatusId: statusId });
    }

    const handleTaskAdd = (fullTask: TaskFull) => {
        addTask(fullTask);
    }

    function removeCompletedTasks()
    {
        for (const task of tasks.filter(t => t.status.id == BaseStatuses.Completed.id))
        {
            removeTaskFromKanban(task.id!);
        }
    }

    const handleAddCommentary = (commentary: Commentary) => {
        addCommentary(commentary);
    }

    const handleRemoveTaskFromKanban = (taskId: number) => {
        removeTaskFromKanban(taskId);
    }

    const handleRemoveTask = (taskId: number) => {
        eraseTask(taskId);
    }

    function renderModal()
    {
        const canRender = !!fullTaskResponse.data && tasks?.length > 0 && !!stage;
        const fullTask = fullTaskResponse.data as TaskFull;

        return (
            <>
                <CSSTransition timeout={300} in={stage === "view" && canRender} unmountOnExit mountOnEnter>
                    <TaskView
                        onEdit={() => setStage("edit")}
                        ref={taskViewRef}
                        task={fullTask}
                        onClose={() => setStage(null)}
                        onAddCommentary={handleAddCommentary}
                        onRemoveFromKanban={() => handleRemoveTaskFromKanban(fullTask.id)}
                        onRemove={() => handleRemoveTask(fullTask.id)}
                    />
                </CSSTransition>
                <CSSTransition timeout={300} in={stage === "edit" && canRender} unmountOnExit mountOnEnter>
                    <TaskEdit
                        onSave={(task) => putTask(task)}
                        onRemove={() => handleRemoveTask(fullTask.id)}
                        ref={taskViewRef}
                        task={fullTask}
                        onClose={() => setStage(null)}
                        onRemoveFromKanban={() => handleRemoveTaskFromKanban(fullTask.id)}
                        onAddCommentary={handleAddCommentary}
                    />
                </CSSTransition>
                <CSSTransition timeout={300} in={stage === "create"} unmountOnExit mountOnEnter>
                    <TaskCreate ref={taskViewRef} onClose={() => setStage(null)} onCreate={handleTaskAdd} />
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
                        onStatusChange={handleStatusChange}
                        onModalOpen={(id) =>
                        {
                            getFullTask(id, false);
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

// TODO: fix Выполняются Выполняется
// TODO: алерт при удалении завершенных
// TODO: dropdown arrow don't close dropdown
