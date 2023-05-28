import { TaskShort } from "@kanban/data/TaskShort";
import { useHover } from "@kanban/hooks/useHover";
import { CalendarIcon, PersonIcon, PlayIcon, TrashIcon } from "@kanban/ui/icons";
import { DragEvent, DragEventHandler, useRef, useState } from "react";
import { DndPlaceholder } from "../DndPlaceholder";
import * as S from "./Task.styled";

type Props = {
    task: TaskShort;

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
                <S.ProjectTitle>{props.task.project.name}</S.ProjectTitle>
                <S.Tag>#{props.task.tag.tag}</S.Tag>
                <S.Name>
                    <PersonIcon />
                    <p>{`${props.task.author.name} ${props.task.author.surname}`}</p>
                </S.Name>
                <S.Footer>
                    <S.Date>
                        <CalendarIcon />
                        <time>{props.task.deadline.toLocaleDateString("ru")}</time>
                    </S.Date>
                    {isHovered && <Icons />}
                </S.Footer>
            </S.Wrapper>
            {placeholderPosition === "bottom" && <DndPlaceholder />}
        </S.Task>
    );
}

function Icons() {
    return (
        <S.Icons>
            <PlayIcon
                style={{
                    cursor: "pointer",
                    borderRadius: 4.5,
                    outline: "1px solid var(--basic-grey-icon)",
                    color: "var(--basic-grey-icon)",
                }}
                onClick={() => alert("Типа старт задачи")}
                hoverColors={{
                    backgroundColor: "var(--primary-blue-8)",
                    color: "var(--basic-white)",
                }}
            />
            <TrashIcon
                style={{
                    cursor: "pointer",
                    borderRadius: 4.5,
                    outline: "1px solid var(--basic-grey-icon)",
                    color: "var(--basic-grey-icon)",
                }}
                onClick={() => alert("Типа удалилась")}
                hoverColors={{
                    backgroundColor: "var(--primary-blue-8)",
                    color: "var(--basic-white)",
                }}
            />
        </S.Icons>
    );
}
