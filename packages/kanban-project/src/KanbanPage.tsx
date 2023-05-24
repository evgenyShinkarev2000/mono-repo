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
import { BaseStatuses } from "./data/Status";
import { TaskShort } from "./data/TaskShort";
import { kanbanApi, kanbanApiContainer } from "./store/Api";
import { selectShortTasks } from "./store/TaskShortSelector";
import { useFullTask } from "./store/TaskFullTransform";
import { TaskFull } from "./data/TaskFull";

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
    const [patchStatus] = kanbanApiContainer.usePatchTaskStatusMutation();
    // const [getFullTask, fullTaskResponse] = kanbanApi.endpoints.getFullTaskSerializable.useLazyQuery();
    const [getFullTask, fullTaskResponse] = useFullTask();
    const taskViewRef = useRef<HTMLDivElement | null>(null);

    const [stage, setStage] = useState<"edit" | "view" | "create" | null>(null);

    if (!tasks)
    {
        return <TaskLoader />;
    }

    const handleStatusChange = (task: TaskShort, statusId: number) =>
    {
        patchStatus({ taskId: task.id, newStatusId: statusId });
    }

    function removeCompletedTasks()
    {
        for (const task of tasks.filter(t => t.status.id == BaseStatuses.Compleated.id))
        {
            removeTaskFromKanban(task.id);
        }
    }

    function renderModal()
    {
        if (!fullTaskResponse.data || tasks?.length <= 0 || !stage){
            return;
        }

        const fullTask = fullTaskResponse.data as TaskFull;
        debugger;

        return (
            <>
                {/* <CSSTransition timeout={300} in={stage === "view" && !!fullTask} unmountOnExit mountOnEnter> */}
                    <TaskView
                        onEdit={() => setStage("edit")}
                        ref={taskViewRef}
                        task={fullTask}
                        onClose={() => setStage(null)}
                    />
                {/* </CSSTransition> */}
                <CSSTransition timeout={300} in={stage === "edit" && Boolean(fullTask)} unmountOnExit mountOnEnter>
                    <TaskEdit
                        onChange={() => { }}
                        onSave={() => { }}
                        ref={taskViewRef}
                        task={fullTask}
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
