import { DragEventHandler } from "react";
import { useHover } from "src/hooks/useHover";
import { CalendarIcon, PersonIcon, PlayIcon, TrashIcon } from "src/icons";
import { ITask } from "src/types/ITask";
import styled from "styled-components";
import { DndPlaceholder } from "./DndPlaceholder";

type Props = {
    task: ITask;
    isDragOver: boolean;

    onDragOver: DragEventHandler<HTMLDivElement>;
    onDrop: DragEventHandler<HTMLDivElement>;
    onDragStart: DragEventHandler<HTMLDivElement>;
    onDragLeave: DragEventHandler<HTMLDivElement>;

    onClick: () => void;
};

const StyledTask = styled.div<{ isDragOver: boolean }>`
    cursor: grab;
    transition: all 0.3s ease 0s;
    :hover {
        box-shadow: 0px 0px 10px rgba(40, 112, 255, 0.3);
    }
`;

const Wrapper = styled.div<{ isDragOver: boolean }>`
    background-color: #ffffff;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    pointer-events: ${({ isDragOver }) => (isDragOver ? "none" : "all")};
    gap: 10px;
`;

const TaskTitle = styled.h3`
    font-size: 20px;
    line-height: 20px;
`;

const ProjectTitle = styled.p`
    background: #e7efff;
    border-radius: 5px;
    font-size: 16px;
    display: inline-block;
    padding: 0 4px;
    line-height: 130%;
    color: #2870ff;
`;

const Tag = styled.p`
    background: #fef2e0;
    border-radius: 5px;
    display: inline-block;
    padding: 0 4px;
    line-height: 130%;
    color: #ee7900;
`;

const Name = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`;

const Date = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    line-height: 130%;
    padding: 4px 0;
    display: flex;
    align-items: center;
    color: #313131;
`;

const Footer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Icons = styled.div`
    display: flex;
    gap: 8px;
    transition: all 0.3s ease 0s;
`;

export function Task(props: Props): JSX.Element {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();

    return (
        <StyledTask
            onClick={props.onClick}
            ref={hoverRef}
            isDragOver={props.isDragOver}
            draggable
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            onDragStart={props.onDragStart}
            onDragLeave={props.onDragLeave}
        >
            <Wrapper isDragOver={props.isDragOver}>
                <TaskTitle>{props.task.title}</TaskTitle>
                <ProjectTitle>{props.task.project}</ProjectTitle>
                <Tag>#{props.task.tag}</Tag>
                <Name>
                    <PersonIcon />
                    <p>{props.task.executorName}</p>
                </Name>
                <Footer>
                    <Date>
                        <div>
                            <CalendarIcon />
                        </div>
                        <time>{props.task.deadline.toLocaleDateString("ru")}</time>
                    </Date>
                    {isHovered && (
                        <Icons>
                            <PlayIcon style={{ cursor: "pointer" }} />
                            <TrashIcon style={{ cursor: "pointer" }} />
                        </Icons>
                    )}
                </Footer>
            </Wrapper>
            {props.isDragOver && <DndPlaceholder />}
        </StyledTask>
    );
}
