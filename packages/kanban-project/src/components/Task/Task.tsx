import { DragEventHandler } from "react";
import { useHover } from "src/hooks/useHover";
import { CalendarIcon, PersonIcon, PlayIcon, TrashIcon } from "src/ui/icons";
import { ITask } from "src/types/ITask";
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
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    return (
        <S.Task
            onClick={props.onClick}
            ref={hoverRef}
            isDragOver={props.isDragOver}
            draggable
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            onDragStart={props.onDragStart}
            onDragLeave={props.onDragLeave}
        >
            <S.Wrapper isDragOver={props.isDragOver}>
                <S.TaskTitle>{props.task.title}</S.TaskTitle>
                <S.ProjectTitle>{props.task.project}</S.ProjectTitle>
                <S.Tag>#{props.task.tag}</S.Tag>
                <S.Name>
                    <PersonIcon />
                    <p>{props.task.executorName}</p>
                </S.Name>
                <S.Footer>
                    <S.Date>
                        <div>
                            <CalendarIcon />
                        </div>
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
            {props.isDragOver && <DndPlaceholder />}
        </S.Task>
    );
}
