import { ITask, ITaskStatus } from "@kanban/types/ITask";
import { TaskPosition } from "@kanban/types/ITaskPosition";
import { useRef } from "react";
import styled from "styled-components";
import { Column } from "./Column/Column";
import { TaskShort } from "@kanban/data/TaskShort";
import { BaseStatuses, Status } from "@kanban/data/Status";

type Props = {
    tasks: TaskShort[];
    onTasksChange: (tasks: TaskShort[]) => void;
    onModalOpen: (id: string) => void;
};

const Columns = styled.div`
    display: flex;
    gap: 16px;
    > * {
        flex-basis: 20%;
    }
`;

function entriesToTasks(entries: [TaskStatusLiteral, TaskShort[]][]): TaskShort[] {
    const temp = Object.fromEntries(entries);
    return Object.values(temp).flat(1);
}

type TaskStatusLiteral = (typeof BaseStatuses[keyof typeof BaseStatuses])["name"] | string;


function getColumns(tasks: TaskShort[]) {
    const cols: Record<TaskStatusLiteral, TaskShort[]> = {
        "В работу": [],
        "Выполняются": [],
        "Завершенные": [],
        "Проверка": [],
        "Тестирование": [],
    };

    tasks.forEach((task) => {
        if (!cols[task.status.name]) {
            cols[task.status.name] = [task];
        } else {
            cols[task.status.name].push(task);
        }
    });

    return cols;
}

export function Board(props: Props) {
    const cols = getColumns(props.tasks);
    const dragTarget = useRef<TaskPosition | null>(null);

    function onReplaceItems(to: TaskPosition) {
        const entries = Object.entries(cols) as [TaskStatusLiteral, TaskShort[]][];
        const deleted = removeDraggedTask(entries);

        entries.forEach((col, colIndex) => {
            if (colIndex === to.colIndex) {
                const colTitle = col[0];
                const colTasks = col[1];

                if (to.itemIndex >= colTasks.length) {
                    deleted.status.name = colTitle;
                    colTasks.push(deleted);
                    return;
                }

                colTasks.forEach((_, taskIndex) => {
                    if (taskIndex === to.itemIndex) {
                        deleted.status.name = colTitle;
                        colTasks.splice(taskIndex, 0, deleted);
                    }
                });
            }
        });
        const tasks: TaskShort[] = entriesToTasks(entries);
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

    function removeDraggedTask(entries: [TaskStatusLiteral, TaskShort[]][]) {
        let dragged: TaskShort;

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
        const entries = Object.entries(cols) as [TaskStatusLiteral, TaskShort[]][];
        const dragged = removeDraggedTask(entries);

        entries.forEach((col, i) => {
            if (i === colIndex) {
                dragged.status.name = col[0];
                col[1] = [dragged];
            }
        });

        const tasks: TaskShort[] = entriesToTasks(entries);
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
