import { DragEventHandler, useEffect, useRef, useState } from "react";
import { useHover } from "@kanban/hooks/useHover";
import { CalendarIcon, PersonIcon, PlayIcon, TrashIcon } from "@kanban/ui/icons";
import { ITask } from "@kanban/types/ITask";
import { DndPlaceholder } from "../DndPlaceholder";
import * as S from "./Task.styled";

type Props = {
    task: ITask;
    isDragOver: boolean;

    onDragOver: DragEventHandler<HTMLDivElement>;
    onDrop: DragEventHandler<HTMLDivElement>;
    onDragStart: DragEventHandler<HTMLDivElement>;
    onDragLeave: DragEventHandler<HTMLDivElement>;

    onClick: () => void;
};

export function Task(props: Props): JSX.Element {
    // const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const taskRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [placeholderPosition, setPlaceholderPosition] = useState<"top" | "bottom" | null>(null);

    function toggle() {
        if (placeholderPosition === "bottom") {
            setPlaceholderPosition("top");
        } else if (placeholderPosition === "top") {
            setPlaceholderPosition("bottom");
        }
    }

    return (
        <S.Task
            onClick={props.onClick}
            ref={taskRef}
            draggable
            onDragOver={(e) => {
                props.onDragOver(e);
            }}
            onDrop={(e) => {
                setPlaceholderPosition(null);
                props.onDrop(e);
            }}
            onDragStart={(e) => {
                props.onDragStart(e);
                setTimeout(() => {
                    setPlaceholderPosition("top");
                }, 0);
            }}
            onDragLeave={(e) => {
                if (e.relatedTarget !== wrapperRef.current) {
                    setPlaceholderPosition(null);
                } else if (e.target === taskRef.current) {
                    props.onDragLeave(e);
                }
            }}
        >
            {placeholderPosition === "top" && <DndPlaceholder />}
            <S.Wrapper
                ref={wrapperRef}
                onDragEnter={(e) => {
                    e.stopPropagation();
                    if (placeholderPosition !== null) {
                        toggle();
                    } else if (e.relatedTarget !== null) {
                        setPlaceholderPosition("bottom");
                    }
                }}
                onDragLeave={(e) => {
                    e.stopPropagation();
                }}
            >
                <S.TaskTitle>{props.task.title}</S.TaskTitle>
                <S.ProjectTitle>{props.task.project}</S.ProjectTitle>
                <S.Tag>#{props.task.tag}</S.Tag>
                <S.Name>
                    <PersonIcon />
                    <p>{props.task.executorName}</p>
                </S.Name>
                <S.Footer>
                    <S.Date>
                        <CalendarIcon />
                        <time>{props.task.deadline.toLocaleDateString("ru")}</time>
                    </S.Date>
                    {/* {isHovered && (
                        <S.Icons>
                            <PlayIcon style={{ cursor: "pointer" }} onClick={() => alert("Типа старт задачи")} />
                            <TrashIcon style={{ cursor: "pointer" }} onClick={() => alert("Типа удалилась")} />
                        </S.Icons>
                    )} */}
                </S.Footer>
            </S.Wrapper>
            {placeholderPosition === "bottom" && <DndPlaceholder />}
        </S.Task>
    );
}
