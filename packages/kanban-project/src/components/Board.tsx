import { ITask, ITaskStatus } from "@kanban/types/ITask";
import { TaskPosition } from "@kanban/types/ITaskPosition";
import { useRef } from "react";
import styled from "styled-components";
import { Column } from "./Column/Column";

type Props = {
    tasks: ITask[];
    onTasksChange: (tasks: ITask[]) => void;
    onModalOpen: (id: string) => void;
};

const Columns = styled.div`
    display: flex;
    gap: 16px;
    > * {
        flex-basis: 20%;
    }
`;

function entriesToTasks(entries: [ITaskStatus, ITask[]][]): ITask[] {
    const temp = Object.fromEntries(entries);
    return Object.values(temp).flat(1);
}

function getColumns(tasks: ITask[]) {
    const cols: Record<ITaskStatus, ITask[]> = {
        "В работу": [],
        Выполняются: [],
        Проверка: [],
        Тестирование: [],
        Завершенные: [],
    };

    tasks.forEach((task) => {
        if (!cols[task.status]) {
            cols[task.status] = [task];
        } else {
            cols[task.status].push(task);
        }
    });

    return cols;
}

export function Board(props: Props) {
    const cols = getColumns(props.tasks);
    const dragTarget = useRef<TaskPosition | null>(null);

    function onReplaceItems(to: TaskPosition) {
        const entries = Object.entries(cols) as [ITaskStatus, ITask[]][];
        const deleted = removeDraggedTask(entries);

        entries.forEach((col, colIndex) => {
            if (colIndex === to.colIndex) {
                const colTitle = col[0];
                const colTasks = col[1];

                if (to.itemIndex >= colTasks.length) {
                    deleted.status = colTitle;
                    colTasks.push(deleted);
                    return;
                }

                colTasks.forEach((_, taskIndex) => {
                    if (taskIndex === to.itemIndex) {
                        deleted.status = colTitle;
                        colTasks.splice(taskIndex, 0, deleted);
                    }
                });
            }
        });
        const tasks: ITask[] = entriesToTasks(entries);
        props.onTasksChange(tasks);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>, colIndex: number, itemIndex: number) {
        e.preventDefault();
        if (!dragTarget.current) {
            console.error("Error");
            return;
        }
        if (
            (dragTarget.current?.colIndex === colIndex && dragTarget.current?.itemIndex === itemIndex) ||
            (dragTarget.current?.colIndex === colIndex && dragTarget.current?.itemIndex + 1 === itemIndex)
        ) {
            return;
        }
        onReplaceItems({ colIndex, itemIndex });
    }

    function onDragStart(e: React.DragEvent<HTMLDivElement>, colIndex: number, itemIndex: number) {
        dragTarget.current = {
            colIndex,
            itemIndex,
        };
    }

    function removeDraggedTask(entries: [ITaskStatus, ITask[]][]) {
        let dragged: ITask;

        entries.forEach((col, colIndex) => {
            if (colIndex === dragTarget.current?.colIndex) {
                col[1].forEach((task, taskIndex) => {
                    if (taskIndex === dragTarget.current?.itemIndex) {
                        dragged = col[1].splice(taskIndex, 1)[0];
                    }
                });
            }
        });

        return dragged!;
    }

    function onEmptyColumnDrop(colIndex: number) {
        const entries = Object.entries(cols) as [ITaskStatus, ITask[]][];
        const dragged = removeDraggedTask(entries);

        entries.forEach((col, i) => {
            if (i === colIndex) {
                dragged.status = col[0];
                col[1] = [dragged];
            }
        });

        const tasks: ITask[] = entriesToTasks(entries);
        props.onTasksChange(tasks);
    }

    return (
        <Columns>
            {(Object.keys(cols) as ITaskStatus[]).map((colTitle, colIndex) => (
                <Column
                    key={colTitle}
                    title={colTitle}
                    tasks={cols[colTitle]}
                    onDrop={(e, itemIndex) => onDrop(e, colIndex, itemIndex)}
                    onDragStart={(e, itemIndex) => onDragStart(e, colIndex, itemIndex)}
                    onEmptyColumnDrop={() => onEmptyColumnDrop(colIndex)}
                    onModalOpen={props.onModalOpen}
                />
            ))}
        </Columns>
    );
}
