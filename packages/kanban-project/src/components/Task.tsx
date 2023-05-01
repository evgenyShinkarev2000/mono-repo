import { DragEventHandler } from "react";
import { CalendarIcon, PersonIcon, PlusIcon } from "src/icons";
import { ITask } from "src/types/ITask";
import styled from "styled-components";

type Props = {
    task: ITask;
    isDragOver: boolean;

    onDragOver: DragEventHandler<HTMLDivElement>;
    onDrop: DragEventHandler<HTMLDivElement>;
    onDragStart: DragEventHandler<HTMLDivElement>;
    onDragLeave: DragEventHandler<HTMLDivElement>;
};

const StyledTask = styled.div<{ isDragOver: boolean }>`
    cursor: grab;
`;

const Wrapper = styled.div`
    background-color: #ffffff;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    pointer-events: none;
    gap: 10px;
    & > * {
        pointer-events: none;
    }
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
    display: flex;
    align-items: center;
    color: #313131;
`;

export function Task(props: Props): JSX.Element {
    return (
        <StyledTask
            isDragOver={props.isDragOver}
            draggable
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            onDragStart={props.onDragStart}
            onDragLeave={props.onDragLeave}
        >
            <Wrapper>
                <TaskTitle>{props.task.title}</TaskTitle>
                <ProjectTitle>{props.task.project}</ProjectTitle>
                <Tag>#{props.task.tag}</Tag>
                <Name>
                    <PersonIcon />
                    <p>{props.task.executorName}</p>
                </Name>
                <Date>
                    <div>
                        <CalendarIcon />
                    </div>
                    <time>{props.task.deadline.toLocaleDateString("ru")}</time>
                </Date>
            </Wrapper>
            {props.isDragOver && (
                <DropPlaceholder>
                    <PlusIcon />
                </DropPlaceholder>
            )}
        </StyledTask>
    );
}

const DropPlaceholder = styled.div`
    width: 100%;
    height: 200px;
    border: 2px dashed #333;
    margin-top: 20px;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;
