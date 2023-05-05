import { DragEvent, DragEventHandler, useRef, useState } from "react";
import { useHover } from "@kanban/hooks/useHover";
import { CalendarIcon, PersonIcon, PlayIcon, TrashIcon } from "@kanban/ui/icons";
import { ITask } from "@kanban/types/ITask";
import { DndPlaceholder } from "../DndPlaceholder";
import * as S from "./Task.styled";

type Props = {
    task: ITask;

    onDrop: (event: DragEvent<HTMLDivElement>, position: "before" | "after") => void;
    onDragStart: DragEventHandler<HTMLDivElement>;

    onClick: () => void;
};

export function Task(props: Props) {
    const [taskRef, isHovered] = useHover<HTMLDivElement>();
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
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDrop={(e) => {
                setPlaceholderPosition(null);
                props.onDrop(e, placeholderPosition === "bottom" ? "after" : "before");
            }}
            onDragStart={(e) => {
                props.onDragStart(e);
            }}
            onDragLeave={(e) => {
                if (!taskRef.current?.contains(e.relatedTarget as Node)) {
                    setPlaceholderPosition(null);
                }
            }}
        >
            {placeholderPosition === "top" && <DndPlaceholder />}
            <S.Wrapper
                draggable
                ref={wrapperRef}
                onDragStart={(e) => {
                    setTimeout(() => {
                        setPlaceholderPosition("top");
                    }, 0);
                }}
                onDragEndCapture={(e) => {
                    setPlaceholderPosition(null);
                }}
                onDragEnter={(e) => {
                    e.stopPropagation();
                    if (placeholderPosition !== null) {
                        toggle();
                    } else if (e.relatedTarget !== null) {
                        setPlaceholderPosition("top");
                    }
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
                    {isHovered && (
                        <S.Icons>
                            <PlayIcon style={{ cursor: "pointer" }} onClick={() => alert("Типа старт задачи")} />
                            <TrashIcon style={{ cursor: "pointer" }} onClick={() => alert("Типа удалилась")} />
                        </S.Icons>
                    )}
                </S.Footer>
            </S.Wrapper>
            {placeholderPosition === "bottom" && <DndPlaceholder />}
        </S.Task>
    );
}
