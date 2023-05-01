import { ITask } from "src/types/ITask";
import { DragEvent, useRef, useState } from "react";
import styled from "styled-components";
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
    const [draggedOver, setDraggedOver] = useState<number | null>(null);
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
                            isDragOver={i === draggedOver}
                            key={task.title}
                            task={task}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDraggedOver(i);
                            }}
                            onDragLeave={(e) => setDraggedOver(null)}
                            onDrop={(e) => {
                                props.onDrop(e, i);
                                setDraggedOver(null);
                            }}
                            onDragStart={(e) => props.onDragStart(e, i)}
                        />
                    ))}
                </S.Tasks>
            )}
        </S.StyledColumn>
    );
}
