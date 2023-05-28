import { Status } from "@kanban/data/Status";
import { TaskShort } from "@kanban/data/TaskShort";
import { DragEvent, useRef, useState } from "react";
import { DndPlaceholder } from "../DndPlaceholder";
import { Task } from "../Task/Task";
import * as S from "./Column.styled";

type ColumnProps = {
    status: Status;
    tasks: TaskShort[];

    onDrop: (event: DragEvent<HTMLDivElement>, itemIndex: number) => void;
    onDragStart: (event: DragEvent<HTMLDivElement>, itemIndex: number, task: TaskShort) => void;
    onEmptyColumnDrop: (statusId: number) => void;
    onModalOpen: (taskId: number) => void;
};

export function Column(props: ColumnProps): JSX.Element
{
    const ref = useRef<HTMLDivElement | null>(null);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    return (
        <S.StyledColumn
            ref={ref}
            draggable
            onDragOver={(e: DragEvent) =>
            {
                e.preventDefault();
                if (props.tasks.length === 0)
                {
                    setShowPlaceholder(true);
                }
            }}
            onDrop={(e: DragEvent) =>
            {
                e.preventDefault();
                setShowPlaceholder(false);
                if (props.tasks.length === 0)
                {
                    props.onEmptyColumnDrop(props.status.id);
                }
            }}
            onDragStart={(e) =>
            {
                if (e.target === ref.current)
                {
                    e.preventDefault();
                }
            }}
            onDragLeave={(e) =>
            {
                setShowPlaceholder(false);
            }}
        >
            <S.Header>{props.status.name}</S.Header>
            {showPlaceholder ? (
                <DndPlaceholder />
            ) : (
                <S.Tasks>
                    {props.tasks.map((task, i) => (
                        <Task
                            onClick={() => props.onModalOpen(task.id!)}
                            key={task.id}
                            task={task}
                            onDrop={(e, position) =>
                            {
                                const index = position === "after" ? i + 1 : i;
                                props.onDrop(e, index);
                            }}
                            onDragStart={(e) => props.onDragStart(e, i, task)}
                        />
                    ))}
                </S.Tasks>
            )}
        </S.StyledColumn>
    );
}
