import { ITask } from "@kanban/types/ITask";
import { DragEvent, useRef, useState } from "react";
import { Task } from "../Task/Task";
import { DndPlaceholder } from "../DndPlaceholder";
import * as S from "./Column.styled";

type ColumnProps = {
    title: string;
    tasks: ITask[];

    onDrop: (event: DragEvent<HTMLDivElement>, itemIndex: number) => void;
    onDragStart: (event: DragEvent<HTMLDivElement>, itemIndex: number) => void;
    onEmptyColumnDrop: () => void;
    onModalOpen: (id: string) => void;
};

export function Column(props: ColumnProps): JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    return (
        <S.StyledColumn
            ref={ref}
            draggable
            onDragOver={(e: DragEvent) => {
                e.preventDefault();
                if (props.tasks.length === 0) {
                    setShowPlaceholder(true);
                }
            }}
            onDrop={(e: DragEvent) => {
                e.preventDefault();
                setShowPlaceholder(false);
                if (props.tasks.length === 0) {
                    props.onEmptyColumnDrop();
                }
            }}
            onDragStart={(e) => {
                if (e.target === ref.current) {
                    e.preventDefault();
                }
            }}
            onDragLeave={(e) => {
                setShowPlaceholder(false);
            }}
        >
            <S.Header>{props.title}</S.Header>
            {showPlaceholder ? (
                <DndPlaceholder />
            ) : (
                <S.Tasks>
                    {props.tasks.map((task, i) => (
                        <Task
                            onClick={() => props.onModalOpen(task.title)}
                            key={task.title}
                            task={task}
                            onDrop={(e, position) => {
                                const index = position === "after" ? i + 1 : i;
                                props.onDrop(e, index);
                            }}
                            onDragStart={(e) => props.onDragStart(e, i)}
                        />
                    ))}
                </S.Tasks>
            )}
        </S.StyledColumn>
    );
}
